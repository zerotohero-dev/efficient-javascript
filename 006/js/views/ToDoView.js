define([
    'backbone',
    'underscore',
     'text!../../templates/ToDoView.html'
], function(
    Backbone,
    _,
    toDoViewTmpl
) {
    'use strict';

    /**
     *
     */
    return Backbone.View.extend({
        className : 'todo-container',

        template: _.template(toDoViewTmpl),

        events : {
            'click span[data-action=delete]' : 'handleDelete'
        },

        /**
         *
         */
        handleDelete: function() {
            this.remove();
        },

        /**
         *
         */
        initialize : function(options) {
            this.model.on('change',  this.render, this);

            options.parent.on('remove:all', this.handleDelete, this);

            Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render: function() {
            this.$el.html(
                this.template(
                    this.model.toJSON()
                ) + Math.floor(Math.random()*100 % 100)
            );

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
