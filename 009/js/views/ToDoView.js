define([
    'core/Config',
    'core/PubSubHub',
    'i18n/Bundle',
    'utils/Debug',
    'utils/Dom',
    'utils/String',
    'underscore',
    'backbone',
    'text!../../templates/ToDoView.html'
], function(
    Config,
    PubSubHub,
    i18n,
    Debug,
    Dom,
    StringUtil,
    _,
    Backbone,
    toDoViewTmpl
) {
    'use strict';

    var selector    = Config.selector,
        event       = Config.event,
        trace       = Debug.trace,
        warn        = Debug.warn,
        subscribe   = PubSubHub.subscribe,
        unsubscribe = PubSubHub.unsubscribe,
        events      = {};

    events['click ' + selector.BTN_DELETE] = 'delete_click';

    /**
     *
     */
    return Backbone.View.extend({
        className : Config.className.TASK_CONTAINER,

        template: _.template(toDoViewTmpl),

        events : events,

        /**
         *
         */
        delete_click : function() {
            trace('>>>ToDoView.handleDelete');

            this.destruct();

            trace('<<<ToDoView.handleDelete');
        },

        /**
         *
         */
        initialize : function() {
            trace('>>>ToDoView.initialize');

            this.model.on('change', this.render, this);

            subscribe(this, event.REMOVE_ALL_TASKS_TRIGGERED);

            trace('<<<ToDoView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        destruct : function() {
            this.unbind();

            this.model.off();
            this.model.unbind();
            this.model.destroy();

            if (this.model.collection) {
                this.model.collection.remove(this.model);
            }

            unsubscribe(this);

            this.remove();

            delete this.el;
            delete this.$el;
        },

        /**
         *
         */
        notify : function(message) {
            switch(message) {
            case event.REMOVE_ALL_TASKS_TRIGGERED:
                this.destruct();

                break;
            default:
                warn('TodoView.notify" unknown message "' +
                    message + '"');

                break;
            }
        },

        /**
         *
         */
        render : function() {
            trace('>>>ToDoView.render');

            var data = this.model.toJSON();

            data.suffix    = StringUtil.generateRandomSuffix();
            data.Bundle    = i18n;
            data.appPrefix = Config.APP_PREFIX;

            Dom.html(this.$el, this.template(data));

            trace('<<<ToDoView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
