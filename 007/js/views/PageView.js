define([
    'utils/Config',
    'utils/Debug',
    'underscore',
    'backbone',
    'text!../../templates/PageView.html'
], function(
    Config,
    Debug,
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
            'click #clean' : 'removeAllToDos'
        },

        /**
         *
         */
        addTodo : function() {
            this.collectionView.trigger(Config.event.ADD_RANDOM_TASK);
        },

        /**
         *
         */
        removeAllToDos : function() {
            this.collectionView.trigger(Config.event.REMOVE_ALL_TASKS);
        },

        /**
         *
         */
        initialize : function(options) {
            this.collectionView = options.collectionView;

            this.collectionView.parent = this;

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            var kDebugTimerId = 'PageView.render';

            Debug.time(kDebugTimerId);

            this.$el.html(this.template());

            // ?
            this.collectionView.render();

            Debug.timeEnd(kDebugTimerId);

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
