define([
    'utils/Debug',
    'utils/Config',
    'utils/String',
    'underscore',
    'backbone',
    'text!../../templates/ToDoView.html'
], function(
    Debug,
    Config,
    StringUtil,
    _,
    Backbone,
    toDoViewTmpl
) {
    'use strict';

    var kRemoveAllTasks = Config.event.REMOVE_ALL_TASKS;

    /**
     *
     */
    return Backbone.View.extend({
        className : 'todo-container',

        template: _.template(toDoViewTmpl),

        events : {
            'click span[data-action=delete]' : 'handleDelete'
        },

        destruct : function() {
            this.unbind();
            this.model.unbind();
            this.model.destroy();
            this.options.parent.off(null, this.handleDelete);
            this.remove();

            delete this.el;
            delete this.$el;
        },

        /**
         *
         */
        handleDelete : function() {
            Debug.trace('>>>ToDoView.handleDelete');

            this.destruct();

            Debug.trace('<<<ToDoView.handleDelete');
        },

        /**
         *
         */
        initialize : function(options) {
            Debug.trace('>>>ToDoView.initialize');

            this.model.on('change', this.render, this);

            options.parent.on(kRemoveAllTasks, this.handleDelete, this);

            Debug.trace('<<<ToDoView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            Debug.trace('>>>ToDoView.render');

            this.$el.html(
                this.template(
                    this.model.toJSON()
                    //?
                ) + StringUtil.generateRandomSuffix()
            );

            Debug.trace('<<<ToDoView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
