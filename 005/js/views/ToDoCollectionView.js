define([
    'backbone',
    'views/PageView',
    'views/ToDoView'
], function(
    Backbone,
    PageView,
    ToDoView
) {
    'use strict';

    /**
     *
     */
    return Backbone.View.extend({

        /**
         *
         */
        initialize : function() {
            var self = this;

            this.collection.bind('add', function() {
                new ToDoView({
                    model  : self.collection.at(self.collection.length-1),
                    parent : self
                }).render();
            });

            this.on('add:random', function() {
                var rnd  = Math.floor(Math.random()*100 % 100),
                    time = (new Date()).getTime();

                self.collection.add([{
                    'id'          : 'todo-' + time + '-' + rnd,
                    'startDate'   : '2013-03-30',
                    'title'       : 'random todo ' + rnd,
                    'description' : 'todo-' + rnd
                }]);

                self.render();

                setTimeout(function() {
                    window.document.body.scrollTop =
                        window.document.documentElement.scrollHeight;
                }, 0);
            });

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            window.document.getElementById('container').innerHTML = '';

            var self = this;

            window.pageView.$el.find('#container').append(
                '<h1>Crazy <strong>To Do</strong> List</h1>'
            );

            this.collection.each(function(todo) {
                window.pageView.$el.find('#container').append(
                    (new ToDoView({
                        model  : todo,
                        parent : self
                    })).render().el
                );
            });

            window.pageView.$el.find('#controls').html(
                '<a href="#" id="clean" class="btn-removeall">' +
                '<i></i>remove all "to do"s</a>'                +
                '<a href="#" id="add" class="btn-add">'         +
                '<i></i>add a random "to do"</a>'
            );

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
