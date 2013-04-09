define([
    'core/Config',
    'core/PubSub',
    'utils/Debug',
    'utils/String',
    'backbone'
], function(
    Config,
    PubSub,
    Debug,
    StringUtil,
    Backbone
) {
    'use strict';

    var event       = Config.event,
        log         = Debug.log,
        time        = Debug.time,
        timeEnd     = Debug.timeEnd,
        trace       = Debug.trace;

    /**
     * @function {private} generateTask
     */
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
     *
     */
    return Backbone.View.extend({

        /**
         *
         */
        addRandomTask : function() {
            log('>>>TodoCollectionView.addRandomTask');

            var task = generateTask();

            task.isRandom = true;

            this.collection.add([task]);

            PubSub.publish(event.RECEIVED_NEW_TASK, this, [task]);

            log('<<<TodoCollectionView.addRandomTask');
        },

        /**
         *
         */
        initialize : function() {
            log('>>>TodoCollectionView.initialize<<<');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
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

            this.remove();

            delete this.el;
            delete this.$el;

            log('<<<ToDoCollectionView.destruct');
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

            PubSub.publish(event.RENDER_BATCH_STARTED);

            this.collection.each(function(todo) {
                trace('>>>TodoCollectionView.collection.each');

                PubSub.publish(kNewTask, self, [todo]);

                trace('<<<ToDoCollectionView.collection.each');
            });

            timeEnd(kDebugTimerId);

            log('<<<TodoCollectionView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
