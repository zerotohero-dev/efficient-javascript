define([
    'utils/Debug',
    'jquery',
    'views/PageView',
    'views/ToDoCollectionView',
    'collections/ToDoCollection',
    'caches/TodoCollectionCache'
], function(
    Debug,
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
            Debug.log('>>>bootstrap.run');

            var todos, todoCollectionView, pageView;

            todos = new ToDoCollection();

            Debug.log('[bootstrap] created collection');

            todos.add(ToDoCollectionCache.getAll());

            Debug.log('[bootstrap] populated collection');

            todoCollectionView = new ToDoCollectionView({collection : todos});

            Debug.log('[bootstrap] created collection view');

            pageView = new PageView({collectionView : todoCollectionView});

            Debug.log('[bootstrap] created page view');

            $('body').append(pageView.render().$el);

            Debug.log('<<<bootstrap.run');
        }
    };
});
