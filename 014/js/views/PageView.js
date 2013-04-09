define([
    'core/Config',
    'core/PubSub',
    'i18n/Bundle',
    'utils/Debug',
    'utils/Dom',
    'utils/String',
    'underscore',
    'backbone',
    'text!../../templates/PageView.html',
    'text!../../templates/PageView.controls.html',
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
    pageViewTmpl,
    pageViewControlsTmpl,
    toDoViewTmpl
) {
    'use strict';

    var log                   = Debug.log,
        trace                 = Debug.trace,
        time                  = Debug.time,
        timeEnd               = Debug.timeEnd,
        selector              = Config.selector,
        event                 = Config.event,
        attribute             = Config.attribute,
        html                  = Dom.html,
        find                  = Dom.find,
        prevent               = Dom.prevent,
        append                = Dom.append,
        empty                 = Dom.empty,
        createDiv             = Dom.createDiv,
        target                = Dom.getActionTarget,
        attr                  = Dom.attr,
        remove                = Dom.remove,
        parent                = Dom.parent,
        events                = {},
        todoViewTplFn         = _.template(toDoViewTmpl),
        pageViewControlsTplFn = _.template(pageViewControlsTmpl);

    /**
     * @function {private} renderSkeleton
     */
    function renderSkeleton() {
        /*jshint validthis:true */

        log('>>>PageView.renderSkeleton');

        html(
            find(this.$el, selector.PAGE_CONTROLS),
            pageViewControlsTplFn({
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

        html(this.$el, this.template({
            Bundle    : i18n,
            appPrefix : Config.APP_PREFIX
        }));

        log('<<<PageView.renderInitialTemplate');
    }

    events['click ' + selector.BTN_ADD   ] = 'add_click';
    events['click ' + selector.BTN_CLEAN ] = 'clean_click';
    events['click ' + selector.BTN_DELETE] = 'delete_click';

    /**
     *
     */
    return Backbone.View.extend({
        template : _.template(pageViewTmpl),
        events   : events,

        /**
         *
         */
        delete_click : function(evt) {
            log('>>>PageView.delete_click');

            prevent(evt);

            PubSub.publish(
                event.DELETE_TASK_TRIGGERED,
                this,
                [attr(target(evt), attribute.DATA_ID)]
            );

            log('<<<PageView.delete_click');
        },

        /**
         *
         */
        add_click : function(evt) {
            log('>>>PageView.addTodo');

            prevent(evt);

            PubSub.publish(event.ADD_RANDOM_TASK_TRIGGERED);

            log('<<<PageView.addTodo');
        },

        /**
         *
         */
        clean_click : function(evt) {
            log('>>>PageView.removeAllTasks');

            prevent(evt);

            PubSub.publish(event.REMOVE_ALL_TASKS_TRIGGERED);

            log('<<<PageView.removeAllTasks');
        },

        /**
         *
         */
        resetContainer : function() {
            log('>>>PageView.resetContainer');

            empty(find(this.$el, selector.PAGE_CONTAINER));

            log('<<<PageView.resetContainer');
        },

        /**
         *
         */
        appendTask : function(el) {
            trace('>>>PageView.appendTask');

            //var kTimeId = 'pageViewAppendTask';

            //time(kTimeId);

            append(find(this.$el, selector.PAGE_CONTAINER), el);

            //timeEnd(kTimeId);

            trace('<<<PageView.appendTask');
        },

        /**
         *
         */
        initialize : function() {
            log('>>>PageView.initialize<<<');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
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
        destructAllTasks : function() {
            log('>>>PageView.destructAllTasks');

            empty(find(this.$el, selector.PAGE_CONTAINER));

            log('<<<PageView.destructAllTasks');
        },

        /**
         *
         */
        removeTask : function(id) {
            log('>>>PageView.removeTask');

            var sel = selector.BTN_DELETE_TMPL.replace(/\{0\}/g, id);

            remove(parent(parent(find(this.$el, sel))));

            log('<<<PageView.removeTask');
        },

        appendNewTask: function(model, shouldScroll) {
            trace('>>>PageView.appendNewTask');

            var item  = model.toJSON ? model.toJSON() : model,
                div   = createDiv();

            item.appPrefix = Config.APP_PREFIX;
            item.suffix    = StringUtil.generateRandomSuffix();
            item.Bundle    = i18n;

            div.className = Config.className.TASK_CONTAINER;
            div.innerHTML = todoViewTplFn(item);

            this.appendTask(div);

            trace('<<<PageView.appendNewTask');

            if (shouldScroll) {
                PubSub.publish(event.TASK_APPENDED);
            }
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

            PubSub.publish(event.PAGE_VIEW_RENDERED);

            return Backbone.View.prototype.render.apply(this, arguments);
        },

        /**
         *
         */
        appendSelfToDom : function() {
            log('>>>PageView.appendSelfToDom');

            append('body', this.render().$el);

            log('<<<PageView.appendSelfToDom');
        }
    });
});
