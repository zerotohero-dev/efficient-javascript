define([
    'utils/Config',
    'utils/String',
    'underscore',
    'backbone',
    'text!../../templates/ToDoView.html'
], function(
    Config,
    StringUtil,
    _,
    Backbone,
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

            options.parent.on(Config.event.REMOVE_ALL_TASKS,
                this.handleDelete, this);

            Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render: function() {

            this.$el.html(
                this.template(
                    this.model.toJSON()
                    //?
                ) + StringUtil.generateRandomSuffix()
            );

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
