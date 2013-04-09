define([
    'utils/Debug',
    'core/Config',
    'utils/Dom',
    'backbone',
    'views/PageView',
    'views/ToDoCollectionView',
    'collections/ToDoCollection',
    'caches/TodoCollectionCache'
], function(
    Debug,
    Config,
    Dom,
    Backbone,
    PageView,
    ToDoCollectionView,
    ToDoCollection,
    ToDoCollectionCache
) {
    'use strict';

    // To supress REST warnings.
    Backbone.emulateHTTP = true;

    var log = Debug.log;

    /**
     *
     */
    return {

        /**
         *
         */
        run : function() {
            log('>>>bootstrap.run');

            var toDos,
                toDoCollectionView,
                pageView,
                root = window[Config.ROOT_NAMESPACE] = {};

            toDos = new ToDoCollection();

            log('[bootstrap] created collection');

            toDos.add(ToDoCollectionCache.getAll());

            log('[bootstrap] populated collection');

            toDoCollectionView = new ToDoCollectionView({collection : toDos});

            log('[bootstrap] created collection view');

            pageView = new PageView();

            log('[bootstrap] created page view');

            Dom.append('body', pageView.render().$el);

            root.toDoCollectionView = toDoCollectionView;
            root.pageView           = pageView;

            log('<<<bootstrap.run');
        }
    };
});
