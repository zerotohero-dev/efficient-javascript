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

beforeEach(function() {
    var flag = false;

    require(['views/ToDoView'], function(foo) {
        flag = true;
    });

    waitsFor(function() {
        return flag === true;
    });
});

describe("ToDoView", function() {
    it("SHOULD be able to create a view", function() {
        var view = require('views/ToDoView');

        expect(view).toBeDefined();
    });
});