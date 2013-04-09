define([
    'jquery',
    'views/PageView',
    'views/ToDoCollectionView',
    'collections/ToDoCollection',
    'caches/TodoCollectionCache'
], function(
    $,
    PageView,
    ToDoCollectionView,
    ToDoCollection,
    ToDoCollectionCache
) {
    'use strict';

    /**
     *
     */
    return {

        /**
         *
         */
        run : function() {
            var todos, todoCollectionView;

            todos = new ToDoCollection();

            todos.add(ToDoCollectionCache);

            todoCollectionView = new ToDoCollectionView({
                collection : todos
            });

            window.pageView = new PageView({
                collectionView : todoCollectionView
            });

            $('body').append(window.pageView.render().$el);
        }
    };
});
