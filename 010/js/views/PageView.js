define([
    'core/Config',
    'core/PubSub',
    'i18n/Bundle',
    'utils/Debug',
    'utils/Dom',
    'underscore',
    'backbone',
    'text!../../templates/PageView.html',
    'text!../../templates/PageView.controls.html'
], function(
    Config,
    PubSub,
    i18n,
    Debug,
    Dom,
    _,
    Backbone,
    pageViewTmpl,
    pageViewControlsTmpl
) {
    'use strict';

    var log         = Debug.log,
        trace       = Debug.trace,
        time        = Debug.time,
        timeEnd     = Debug.timeEnd,
        publish     = PubSub.publish,
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
        resetContainer : function() {
            log('>>>PageView.resetContainer');

            Dom.empty(
                Dom.find(this.$el, selector.PAGE_CONTAINER)
            );

            log('<<<PageView.resetContainer');
        },

        /**
         *
         */
        appendTask : function(el) {
            trace('>>>PageView.appendTask');

            Dom.append(
                Dom.find(this.$el, selector.PAGE_CONTAINER),
                el
            );

            trace('<<<PageView.appendTask');
        },

        /**
         *
         */
        initialize : function() {
            log('>>>PageView.initialize');

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

            this.remove();

            delete this.el;
            delete this.$el;

            log('<<<PageView.destruct');
        },

        /**
         *
         */
        render : function() {
            log('>>>PageView.render');

            var kDebugTimerId = 'PageView.render';

            time(kDebugTimerId);

            renderInitialTemplate.call(this);

            this.resetContainer();

            renderSkeleton.call(this);

            timeEnd(kDebugTimerId);

            log('<<<PageView.render');

            publish(event.PAGE_VIEW_RENDERED);

            return Backbone.View.prototype.render.apply(this, arguments);
        },

        appendSelfToDom : function() {
            Dom.append('body', this.render().$el);
        }
    });
});
