define([
    'underscore',
    'backbone'
], function(
    _,
    Backbone
) {
    'use strict';

    /**
     *
     */
    return Backbone.View.extend({
        template : _.template(
            '<div id="container"></div>' +
            '<div id="controls"></div>'
        ),

        events : {
            'click #add'   : 'addTodo',
            'click #clean' : 'removeAllTodos'
        },

        /**
         *
         */
        addTodo : function() {
            window.toDoCollectionView.trigger('add:random');
        },

        /**
         *
         */
        removeAllTodos : function() {
            window.toDoCollectionView.trigger('remove:all');
        },

        /**
         *
         */
        initialize : function() {
            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            this.$el.html(this.template());

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
