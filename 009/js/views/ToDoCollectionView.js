define([
    'core/Config',
    'core/PubSubHub',
    'utils/Debug',
    'utils/String',
    'backbone'
], function(
    Config,
    PubSubHub,
    Debug,
    StringUtil,
    Backbone
) {
    'use strict';

    var subscribe   = PubSubHub.subscribe,
        unsubscribe = PubSubHub.unsubscribe,
        publish     = PubSubHub.publish,
        event       = Config.event,
        log         = Debug.log,
        time        = Debug.time,
        timeEnd     = Debug.timeEnd,
        warn        = Debug.warn,
        trace       = Debug.trace;

    function generateTask() {
        var id    = StringUtil.generateId(),
            title = StringUtil.generateRandomTitle( id ),
            now   = (new Date()).getTime(),
            key   = Config.modelKey,
            item  = {};

        item[key.ID]          = id;
        item[key.START_DATE]  = now;
        item[key.TITLE]       = title;
        item[key.DESCRIPTION] = title;

        return item;
    }

    /**
     * @function {private} addRandomTask
     */
    function addRandomTask() {
        /*jshint validthis:true */

        log('>>>TodoCollectionView.addRandomTask');

        var task = generateTask();

        this.collection.add([task]);

        // ?
        this.render();

        // ?
        setTimeout(function() {
            window.document.body.scrollTop =
                window.document.documentElement.scrollHeight;
        }, 0);

        log('<<<TodoCollectionView.addRandomTask');
    }

    /**
     * @function {private} renderItems
     */
    function renderItems() {
        /*jshint validthis:true */

        log('>>>TodoCollectionView.renderItems');

        // ?
        this.render();

        log('<<<TodoCollectionView.renderItems');
    }

    /**
     *
     */
    return Backbone.View.extend({

        /**
         *
         */
        initialize : function() {
            log('>>>TodoCollectionView.initialize');

            subscribe(this, event.ADD_RANDOM_TASK_TRIGGERED);
            subscribe(this, event.PAGE_VIEW_RENDERED);

            log('<<<TodoCollectionView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        destruct: function() {
            log('>>>ToDoCollectionView.destruct');

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

            log('<<<ToDoCollectionView.destruct');
        },

        notify : function(message) {
            log('>>>TodoCollectionView.notify("' + message + '")');

            switch(message) {
            case event.ADD_RANDOM_TASK_TRIGGERED:
                addRandomTask.call(this);

                break;
            case event.PAGE_VIEW_RENDERED:
                renderItems.call(this);

                break;
            default:
                warn('TodoCollectionView.notify: ' +
                    'unknown message: "' + message + '"');

                break;
            }

            log('>>>TodoCollectionView.notify');
        },

        /**
         *
         */
        render : function() {
            log('>>>TodoCollectionView.render');

            var kDebugTimerId = 'TodoCollectionView.render',
                self          = this,
                kNewTask      = event.RECEIVED_NEW_TASK;

            time(kDebugTimerId);

            publish(event.RENDER_BATCH_STARTED);

            this.collection.each(function(todo) {
                trace('>>>TodoCollectionView.collection.each');

                publish(kNewTask, self, [todo]);

                trace('<<<ToDoCollectionView.collection.each');
            });

            timeEnd(kDebugTimerId);

            log('<<<TodoCollectionView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
