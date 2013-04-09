--------------------------------------------------------------------------------

That's it.
There are further areas of improvement.
And
- code coverage repots
- and code complexity anaylses

can be used as indicator of where to refactor.

In our scenario for instance

✓ js/views/PageView.js              █████ 113.76
✓ js/views/ToDoCollectionView.js    █████ 114.17

we can split PageView and ToDoCollectionView view to smaller files to
reduce their complexity, and to make our application easier to maintain.

That's all folks.

May the source be with you!


commit 56e416f907b0ba41527328db262e88c1385754be
--------------------------------------------------------------------------------

Done with the unit tests,
The next thing is merging and minifying js files.
Which is really easy with grunt.

And all done.

commit f6a78d51a1429d97f374dbdf1b1c504376f715f3
--------------------------------------------------------------------------------
Agenda

[x] Adding unit tests.
[-] Creating a publish script.

commit 61a3ab4c549d6f2e142b7b118d923f3cda769685
--------------------------------------------------------------------------------

Agenda:
[-] Improving render performance.
[-] Adding unit tests.
[-] Creating a publish script.

There are several obvious issues with rendering:
- Each time a task is added, entire page is rendered; it's redundant and will
result in screen flickers and freezes.
- Initial rendering time can be faster (currently 40ms).

We'll start with the latter.

Let's focus on the list item rendering.

        modules[moduleName.MAIN_PAGE_VIEW].appendTask(
            (new ToDoView({model : model})).render().el
        );

We create a ToDoView, and we only use it's .el.
Event the events of the ToDoView is managed by the PageView.
And we create these objects inside a loop. Object creation inside a loop
can be expensive, depending on the type of the object. Especially, Backbone
Views are not the most memory-friendly objects to carry around. The less
objects we create and destroy, the less garbage collector will be messing
with our code. That's a good thing, because at each gc cycle everything
including the UI momentarily stops, since JavaScript is single-threaded.

Everything being equal (and it never is), the less object construction,
the better.
If you can use a static object, or a static scope, instead of creating a new
one; do it!

This rule of thumb is not specific to JavaScript, static is always faster.
However, due to the functional nature of JavaScript, you'll benefit more
if you think in "functions", "scopes", "scope chains", "monads" instead of
thinking in classes, subclasses and inheritance.

Of course some classical patterns will give your application a structure to
hold on to. And a little object orientedness is beneficial. Just keep in ming
that
- Creating and using objects can be slower than using static functions. The
buffier the objects are, the more visible the speed difference is.
- The more objects you create and destroy; the more burden there is on garbage
collector.

If you find yourself rapidly creating and destroying objects (either by
explicitly deleting the object or by creating
objects, leaving them out of scope and letting the garbage collector decide
their fate) then your rendering performance can suffer; the user can experience
screen freezes every once in a while when the garbage collector takes control.

These kinds of issues are really hard to detect because
- They occur randomly;
- It's hard to repro on a developer machine with an i7 processor, and 4+ GB ram.

Bottom line is: Do not design your JavaScript application as if you are
designing a Java application.

JavaScript is a "functional" language. Treat it that way.


... so when we replace the template code with a template code.
We see a 70% speed increase. And that increase will be more visible in a
real-life application where the View objects will be more bloated than the
View object of our sample Crazy To Do application.


seq       _.template   new View().render().el
1			32				68
2			33				51
3			35				48
4			36				49
5			35				61
6			36				72
7			31				56
8			32				68
9			34				52
10			32				52
_______________________________________________________
mean    : 33.6			57.7 (71% higher)
std dev :  1.9   	    8.8 (5.12)

{32,33,35,36,35,36,31,32,34,32}-
{68,51,48,49,61,72,56,68,52,52}

... Next thing is, every time we add a new item; we re-render the entire
collection. So if we try to add a new to do item to the list it will take
around 50 milliseconds. We can take this to <5milliseconds margin.

After the template optimization we have a couple of bonuses:
- We don't need the tasks collection in the hub.
- We don't need ToDoView in anywhere in the code.

So it's a lot of cleanup and the "to do" addition happens in 0.240ms millisecs
instaed of 50. So it's a huge step in the right direction.

[x] Improving render performance.
[-] Adding unit tests.
[-] Creating a publish script.

Next up? Testing time!

commit 4d5967aef6dc2fb6ebb5be150c7ffd674aada8ce
--------------------------------------------------------------------------------

[-] Decreasing event handler count using delegation.
[-] Improving render performance.
[-] Adding unit tests.
[-] Creating a publish script.

The next thing we can look as is the number of event handlers registered on
the task list. Each "remove" button has a separate handler. As the list
increases in size, the number of event handlers on the page will increase,
which gradually result in additional memory usage. Our application will become
less responsive in time.

There are sevearl things we can do in this case.

- we can inline the events <a onclick="foo()">
(which purists will frown upon). This will solve possible memory leak issues
in old browsers; the events will be faster (DOM Level 0 events are the fastest)
less memory will be consumed since we won't be registering event handlers.
So it's not a quite a bad idea at all.

- A second option is to use event delegation, and capture the event at a higher
level instead.

And this is as easy as moving the click event handler to the PageView
(Backbone handles the delegation itself, even if it does not, it's really
easy to implement plain old event delegation)

When the event handler is hit on the pageview we notify Hub, because pageview
has zero knowledge about the ToDoView to be destructed.

And in the hub, it's as easy as adding another case to the main switch
and writing some code to find the task by id.

    case event.DELETE_TASK_TRIGGERED:
        log('>>>event.DELETE_TASK_TRIGGERED');

        removeTask(evtArgs.pop());

        log('<<<event.DELETE_TASK_TRIGGERED');

...

    function removeTask(id) {
        var i, len, task;

        for (i = 0, len = tasks.length; i < len; i++) {
            task = tasks[i];

            if (task.model.get('id') === id) {

                task.destruct();

                break;
            }
        }
    }

[x] Decreasing event handler count using delegation.
[-] Improving render performance.
[-] Adding unit tests.
[-] Creating a publish script.

Now the initial page has only 11 event listeners, instead of 200;
a big improvement. Next up? render performance improvements...


commit eeb217ee0427b79669edea7d529a35820ead15b5
--------------------------------------------------------------------------------

Let's review our agenda:

- Further Decoupling.
- Decreasing event handler count using delegation.
- Improving render performance.
- Adding unit tests.
- Creating a publish script.

Each commit we will be dealing with one of these topics.

# Decoupling

Our basic `PubSubHub` implementation help modules decouple from each other.
However, if the size of the application grows, we may need to create a central
`Hub` that listens to all events, decides which module to dispatch those events
to, and acts accordingly.

This is kind of an overkill for our basic application, and we will be doing the
`Hub` implementation for demonstration purposes only. And this will have
practical advantage in larger applications, for sure.

The end result is:
PageView, ToDoCollectionView, and ToDoView do not depend on any external views.
When something interesting happens, if they can handle themselves they handle
the issue, otherwise they publish an event for the responsibility to be chained
to some other module.

The only subscriber to the fired events is the central `Hub`. It's the Hub's
responsibility to decide to call the proper module.

Since the modules depend on nothing but themselves, it's easy to sandbox and
unit test them.

[x] Further Decoupling.
[-] Decreasing event handler count using delegation.
[-] Improving render performance.
[-] Adding unit tests.
[-] Creating a publish script.

Next on the agenda is "event delegation".

commit f1ff6a610e99f2a984ca72d027edbcc72deb4636
--------------------------------------------------------------------------------

We've move the Config module to the `core` folder; and we've implemented
a PubSubHub module which will act as a switchboard.

One next step would be to create a mediator, register all the modules to the
mediator. let the mediator catch the events, and call the apropriate module's
methods on events.

Although we are using AMD modules to isolate logical units of code, it's still a
good practice to expose root-level views that we know will be living throughout
the application's lifetime.

    var root = window[Config.ROOT_NAMESPACE] = {};

    root.todoCollectionView = todoCollectionView;
    root.pageView           = pageView;

Just make sure that you don't use these global references in the modules; they
are for diagnostic and testing purposes only.

We've also added a "very" basic i18n support.

We also prefixed "everything". This especially proves itself to be useful
if you will be using your application, or a part of your application as a
external widget that will be used in another website, or even in a white-labeled
domain of yours.

commit 70e5b10f32c3384a7bc3b6b152dd4e251b351cac
--------------------------------------------------------------------------------

So what's wrong?

Remember the slides about memory leaks? They can stem from two reasons:
- The user agent being old (read "Internet Explorer") and not properly cleaning
up "COM/DOM - JS" circular references.
- There are still live references to the object, mostly due to a central cache,
pubsub event bindings, and the like.

As a rule of thumb memory leaks generally happen in "view code" simply because
- Views generally act as a bridge between JSLandia and DOMLandia;
- And events (to DOM, to models, and to other views) are generally bound on
the views.

If you find out that your views are innoncent, and you are sure that there
are leaks; the next thing to focus would be "Controller"s.

Models are the least guilty of all. Because a well-crafted model has zero
knowledge about neither the views, nor the controllers.

And we find the guilty piece of code:

//ToDoView.js
    // This WILL leak.
    options.parent.on(Config.event.REMOVE_ALL_TASKS,
        this.handleDelete, this);

Every time a ToDoView is added it retains a reference to a ToDoCollectionView
( window.pageView.collectionView; where window.pageView is basically a singleton
that will live forever ). So, even the view is `remove()`d from the DOM; its
`$el` remains detached because of an event binding.

Now that we've found the source of leak, there are several things we can do:

- we can unbind the events once the view is destroyed.
- we can use Backbone specific `listenTo` method to autmatically do this for
ourselves.

Since our aim to be framework-agnostic we will implement the former solution
in this commit.

OR

- we can use a stateless PubSubHub to to decouple the parent object from the
child; and when the child gets destroyed, unregsiter from the hub.

Actually that's what we would be doing "after" we're done with the memory
leaks.

In this commit we've
- fixed the memory leak issues.
- added some basic logging and tracing.

There are still areas to improve.

* For instance PageView and ToDoCollectionView are too tightly coupled.
`self.parent.$el.find('#container').append(`
this will make it harder to test the modules independently.

* There are too many DOM event handlers (203 after the page is initially loaded)
It'd be nice to decrase the number of event handlers using event delegation.

* Initial PageView render time has dropped down to 60 milliseconds; but we
can make it even faster.

We will be dealing with these three issues in the followup commits.

(Then we will dive into things like, how to concat files, and how to do unit
tests and code coverage analyses)

commit e47a953a6e0ecac9a8b94764d244781a2d71a5d9
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
