--------------------------------------------------------------------------------

Now let us profile our application.

* The first thing we see is, we do a lot of network requests; so it would be
nice to merge them into a single (or a few) requests for production.
We will use `r.js` to do that. Unfortunately we cannot merge templates. There
are two options for that

- If we badly need a template as quick as possible, we can inline it in a
JavaScript file.
- Or our build process can convert the template HTML files into JavaScript
variables.

* The second thing we see is excessive use of memory and increase in DOM
node count when we continue clicking "Add" and "Remove All" for a couple of
times. That's bad; because it's an indicator of a memory leak!

* When we further analyze we see:

- DOM node count rapidly increases over time although the number of visible
nodes remain the same.
- Memory utilization rapidly increases over time.
- In DOM Containtment view we see a lot of detached DOM trees.
- And when we investigate further, we see that those detached nodes are
the very nodes that we create for our "to do" list items.

Moreover, it takes around 150 millisconds (on a macbook pro) to render a
single to do item; and the frame performance suffers.

We also have an average of 300 event handlers registered on the page, that's
a little high. Each event handler will consume memory, and if we have too
many event  handlers, it may have performance side effects, too -- since
someboy has to "listen to" those handlers.

We will address all of these (and more) one by one.
Let's start working on the memory leaks in the next commit.

commit 4620971390256e55229120cfc1285e3ec20b9625
--------------------------------------------------------------------------------

Let's factor out some constants. If anything has a possibility to change in the
future, it's a good practice to keep it in a common place to be DRY.

We injected CollectionView into PageView as a dependency.

        addTodo : function() {
            this.collectionView.trigger(Config.event.ADD_RANDOM_TASK);
        },

We've also created utils/Config utils/Debug and utils/String

id          :
startDate   :
title       :
description :

these normally come from the server, and when the API you are connecting to
changes, chances are that these names might change. So it's a good idea to
keep them in a common place.

And also it would be nice to order the AMD parameters since they started to
grow in size.

], function(
    // Utility Classes
        Config,
        StringUtil,
    // Third-Party Objects
        Backbone,
        _,
    // Views
        ...
    // Templates
        toDoViewTmpl
    // Collections
        ...
    // Models
        ...
) {

After linting all the files and makes sure that they are ship shape, we're
ready to check them in.

That's enough for this iteration.
We will do some profiling before going any further.

884cd23e63135e1192297dd914c1b4c957d86794
--------------------------------------------------------------------------------

After hacking around a bit, we're now ready to run automated tests and
display a code coverage report. But before diving into tests we need some
refactoring.

First let's add some utility classes for debugging and profiling.
We will be placing them into js/utils.

Next it'd be nice to factor out the template code, so that it would be easily
maintained by a designer.

And I renamed the folder spec to 'tests' to clarify its intention.

We've extracted templates to /templates folder, and added a !text grunt plugin
to load templates from those folders. Since require.js loads those files via
XmlHttpRequest, we need to copy them to htdocs to see them in action.

Next step is to get rid of some of the dependencies.

749ad8e3feb7f86033cffdc5c4151a8ecac4c8f8
--------------------------------------------------------------------------------

Now it's time to do some test coverage initial setup.
We will be using Jasmine for unit tests; and phantom.js for headless testing.
All of these will be set up in our GruntFile.

I also tried istanbul-js for code coverage analysis but it didn't play well
with AMD. We *can* make it work by overriding/forking require.js; basically
making require.js work sync, while managing test spec dependencies by keeping
files in the correct order. Here's a very basic starting point.

    // will prevent require.js barf about incorrect usage of `define`.
    window.define = function(items, factory) {
        var current = currents.pop(), item, args;
        for (var key in items) {item = items[key];args.push(cache[item]);}
        cache[current] = factory.apply(null, items);
    }

Though for the sake of this demo it's not worth the effort.
And we have other things to deal with.

In more human-readable terms:

- override `define` to run the factory function and cache the output
- overreide `require` to return the cached version.
- make sure that the ordering of the insertions to the cache is correct.

This would be a nice side project. And I plan to implement it in weekend to
satisfy my thirst for hacking (I call those weekends "hack weekends", and
you should have some too ;) ).

This stash `stash@{0}: WIP on master: 749ad8e prepared a basic unit test setup.`
has an initial working prototype for that; just run `grunt jasmine` to see
what I mean.

I'm putting the file here for reference too.
    requirejs.config({
        baseUrl : 'js/',
        paths : {
            jquery     : 'third-party/jquery',
            underscore : 'third-party/underscore',
            backbone   : 'third-party/backbone'
        },
        shim : {
            jquery: {
                exports: 'jQuery'
            },
            underscore : {exports : '_'},
            backbone : {
                deps    : ['underscore', 'jquery'],
                exports : 'Backbone'
            }
        }
    });

    window.define = function(items, factory) {
       window.foo = factory(window.Backbone, window._);
    };

    window.require = function() {
        return window.foo;
    };

commit 9063e908825bcd33600de626170cf948136cb3cf
--------------------------------------------------------------------------------

When we run `grunt jshint` we'll see a lot of validation errors. It'll be
better to continue with a warning-free codebase, so let's do that now.

        Running "jshint:uses_defaults" (jshint) task
        >> 7 files lint free.

        Done, without errors.

The project is error-free. But it has a long way to go in terms of
- Code Organization
- Performance Optimization
- Test Coverage

We'll deal with them one by one in the following commits.

commit 504db4d7084f584317277cafcdfaa7544e61840d
--------------------------------------------------------------------------------

Now let us do some `require.js` magic, and convert our files to AMD modules.

The AMD format comes from wanting a module format that was better than today's
"write a bunch of script tags with implicit dependencies that you have to
manually order". As a side benefit, you'll have a clear understanding of
dependencies between the modules.

The next step would be some code cleanup.

commit 8e0889ce8fb1db9231db21129d29be6f4b700e4c
--------------------------------------------------------------------------------
When we install grunt and do a complexity analysis we get warnings about an
event handler in `TodoCollectionView` being too complicated to maintain.
We will be dealing with `TodoCollectionView` later on.

Also when we run `grunt jshint` we get a horde of JSHint errors.
So our code is not in good shape. Before dealing with JSHint errors, it would
be nice to convert the files into `require.js` AMD modules. Converting files
into modules will be helping us fix some of the warning nonetheless.

For grunt     : <http://gruntjs.com/getting-started>
For require.js: <http://requirejs.org/>

We will be dealing with these in the next commit.

commit 9c7d06cf8df97ec56fe149b4cb6468173d559363
--------------------------------------------------------------------------------
All of the application code resides in main.js.
Although for a small project like this, it's okay, as the size of the project
grows, the project will become harder to maintain. There are metrics we can
use to decide how maintainable a project is; we will come to that shortly.
Let's start by separating views and models.

Ideally each object that we initialize with `new` should reside in a separate
file. Also it will be nice to split application code and third-party libraries
in separate folders.

The next step might be to extract the templates of `ToDoCollectionView` to a
`templates` folder. But before that it'd be nice to setup grunt to automate
build and testing.

$ npm install -g grunt-cli

I will be configuring the gruntfile in the next commit.

commit 6165251c4b9e8f232cf83b8cd350cbd65eed45d5
--------------------------------------------------------------------------------
This is a log file that we'll use to track what changes and refactoring we
will be doing on the application. The first thing will be to initialize git.
At every major change I will be doing a commit. So it will be easire to track
thing from git logs too. -- Let's begin.

LT-A7-120055:app volkan.ozcelik$ git init
Initialized empty Git repository in /Users/volkan.ozcelik/Desktop/udemy/app/.git/
