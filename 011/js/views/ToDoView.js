define([
    'core/Config',
    'core/PubSub',
    'i18n/Bundle',
    'utils/Debug',
    'utils/Dom',
    'utils/String',
    'underscore',
    'backbone',
    'text!../../templates/ToDoView.html'
], function(
    Config,
    PubSub,
    i18n,
    Debug,
    Dom,
    StringUtil,
    _,
    Backbone,
    toDoViewTmpl
) {
    'use strict';

    var event       = Config.event,
        trace       = Debug.trace,
        publish     = PubSub.publish;

    /**
     *
     */
    return Backbone.View.extend({
        className : Config.className.TASK_CONTAINER,
        template  : _.template(toDoViewTmpl),

        /**
         *
         */
        initialize : function() {
            trace('>>>ToDoView.initialize');

            this.model.on('change', this.render, this);

            publish(event.TASK_INITIALIZED, this, []);

            trace('<<<ToDoView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        destruct : function() {
            trace('>>>ToDoView.destruct');

            this.unbind();

            this.model.off();
            this.model.unbind();
            this.model.destroy();

            if (this.model.collection) {
                this.model.collection.remove(this.model);
            }

            this.remove();

            delete this.el;
            delete this.$el;

            publish(event.TASK_DESTRUCTED, this, []);

            trace('<<<ToDoView.destruct');
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
