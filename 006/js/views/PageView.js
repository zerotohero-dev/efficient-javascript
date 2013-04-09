define([
    'underscore',
    'backbone',
    'utils/Debug',
    'text!../../templates/PageView.html'
], function(
    _,
    Backbone,
    Debug,
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
            window.toDoCollectionView.trigger('add:random');
        },

        /**
         *
         */
        removeAllToDos : function() {
            window.toDoCollectionView.trigger('remove:all');
        },

        /**
         *
         */
        initialize : function() {
            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        render : function() {
            Debug.time('PageView.render');

            this.$el.html(this.template());

            Debug.timeEnd('PageView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
