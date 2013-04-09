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

            window.pageView = new PageView();

            $('body').append(window.pageView.render().$el);

            todos = new ToDoCollection();

            todos.add(ToDoCollectionCache);

            todoCollectionView = new ToDoCollectionView({
                collection: todos
            });

            todoCollectionView.render();
        }
    };
});
