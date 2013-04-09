define([
    'utils/Debug',
    'utils/Config',
    'underscore',
    'backbone',
    'text!../../templates/PageView.html'
], function(
    Debug,
    Config,
    _,
    Backbone,
    pageViewTmpl
) {
    'use strict';

    /**
     *
     */
    return Backbone.View.extend({
        template : _.template(pageViewTmpl),

        events : {
            'click #add'   : 'addTodo',
            'click #clean' : 'removeAllTasks'
        },

        /**
         *
         */
        addTodo : function() {
            Debug.log('>>>PageView.addTodo');

            this.collectionView.trigger(Config.event.ADD_RANDOM_TASK);

            Debug.log('<<<PageView.addTodo');
        },

        /**
         *
         */
        removeAllTasks : function() {
            Debug.log('>>>PageView.removeAllTasks');

            this.collectionView.trigger(Config.event.REMOVE_ALL_TASKS);
            this.collectionView.collection.reset();

            Debug.log('<<<PageView.removeAllTasks');
        },

        /**
         *
         */
        initialize : function(options) {
            Debug.log('>>>PageView.initialize');

            this.collectionView = options.collectionView;

            this.collectionView.parent = this;

            Debug.log('<<<PageView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            Debug.log('>>>PageView.render');

            var kDebugTimerId = 'PageView.render';

            Debug.time(kDebugTimerId);

            this.$el.html(this.template());

            // ?
            this.collectionView.render();

            Debug.timeEnd(kDebugTimerId);

            Debug.log('<<<PageView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
