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
