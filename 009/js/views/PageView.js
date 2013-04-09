define([
    'core/Config',
    'core/PubSubHub',
    'i18n/Bundle',
    'utils/Debug',
    'utils/Dom',
    'underscore',
    'backbone',
    'views/ToDoView',
    'text!../../templates/PageView.html',
    'text!../../templates/PageView.controls.html'
], function(
    Config,
    PubSubHub,
    i18n,
    Debug,
    Dom,
    _,
    Backbone,
    ToDoView,
    pageViewTmpl,
    pageViewControlsTmpl
) {
    'use strict';

    var log         = Debug.log,
        warn        = Debug.warn,
        trace       = Debug.trace,
        time        = Debug.time,
        timeEnd     = Debug.timeEnd,
        subscribe   = PubSubHub.subscribe,
        unsubscribe = PubSubHub.unsubscribe,
        publish     = PubSubHub.publish,
        selector    = Config.selector,
        event       = Config.event,
        events      = {};

    /**
     * @function {private} renderSkeleton
     */
    function renderSkeleton() {
        /*jshint validthis:true */

        log('>>>PageView.renderSkeleton');

        Dom.html(
            Dom.find(this.$el, selector.PAGE_CONTROLS),
            _.template(pageViewControlsTmpl)({
                Bundle    : i18n,
                appPrefix : Config.APP_PREFIX
            })
        );

        log('<<<PageView.renderSkeleton');
    }

    /**
     * @function {private} renderInitialTemplate
     */
    function renderInitialTemplate() {
        /*jshint validthis:true */

        log('>>>PageView.renderInitialTemplate');

        Dom.html(this.$el, this.template({
            Bundle    : i18n,
            appPrefix : Config.APP_PREFIX
        }));

        log('<<<PageView.renderInitialTemplate');
    }

    /**
     * @function {private} resetContainer
     */
    function resetContainer() {
        /*jshint validthis:true */

        log('>>>PageView.resetContainer');

        Dom.empty(
            Dom.find(this.$el, selector.PAGE_CONTAINER)
        );

        log('<<<PageView.resetContainer');
    }

    /**
     * @function {private} resetContainer
     */
    function appendTask(model) {
        /*jshint validthis:true */

        trace('>>>PageView.appendTask');

        Dom.append(
            Dom.find(this.$el, selector.PAGE_CONTAINER),
            // ?
            (new ToDoView({model : model})).render().el
        );

        trace('<<<PageView.appendTask');
    }

    events['click ' + selector.BTN_ADD  ] = 'add_click';
    events['click ' + selector.BTN_CLEAN] = 'clean_click';

    /**
     *
     */
    return Backbone.View.extend({
        template : _.template(pageViewTmpl),
        events   : events,

        /**
         *
         */
        add_click : function() {
            log('>>>PageView.addTodo');

            publish(event.ADD_RANDOM_TASK_TRIGGERED);

            log('<<<PageView.addTodo');
        },

        /**
         *
         */
        clean_click : function() {
            log('>>>PageView.removeAllTasks');

            publish(event.REMOVE_ALL_TASKS_TRIGGERED);

            log('<<<PageView.removeAllTasks');
        },

        /**
         *
         */
        initialize : function() {
            log('>>>PageView.initialize');

            var event = Config.event;

            subscribe(this, event.RECEIVED_NEW_TASK);
            subscribe(this, event.RENDER_BATCH_STARTED);

            log('<<<PageView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        destruct : function() {
            log('>>>PageView.destruct');

            this.unbind();

            if (this.model) {
                this.model.unbind();
                this.model.destroy();
            }

            if (this.collection) {
                this.collection.unbind();
            }

            unsubscribe(this);

            this.remove();

            delete this.el;
            delete this.$el;

            log('<<<PageView.destruct');
        },

        notify : function(message, sender, evtArgs) {
            trace('>>>PageView.notify("' + message + '")');

            switch (message) {
            case event.RENDER_BATCH_STARTED:
                resetContainer.call(this);

                break;
            case event.RECEIVED_NEW_TASK:
                appendTask.call(this, evtArgs.pop());

                break;
            default:
                warn('PageView.notify: unknown message: "' + message + '"');

                break;
            }

            trace('<<<PageView.notify');
        },

        /**
         *
         */
        render : function() {
            log('>>>PageView.render');

            var kDebugTimerId = 'PageView.render';

            time(kDebugTimerId);

            renderInitialTemplate.call(this);
            resetContainer.call(this);
            renderSkeleton.call(this);

            timeEnd(kDebugTimerId);

            log('<<<PageView.render');

            publish(event.PAGE_VIEW_RENDERED);

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
