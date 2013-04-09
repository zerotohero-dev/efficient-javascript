define([
    'utils/Debug',
    'core/Config',
    'core/PubSub',
    'core/Hub',
    'utils/Dom',
    'backbone',
    'views/PageView',
    'views/ToDoCollectionView',
    'collections/ToDoCollection',
    'caches/TodoCollectionCache'
], function(
    Debug,
    Config,
    PubSub,
    Hub,
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

    var log        = Debug.log,
        moduleName = Config.moduleName,
        event      = Config.event;

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

            Hub.initialize();

            toDos = new ToDoCollection();

            log('[bootstrap] created collection');

            toDos.add(ToDoCollectionCache.getAll());

            log('[bootstrap] populated collection');

            toDoCollectionView = new ToDoCollectionView({collection : toDos});

            Hub.register(moduleName.MAIN_COLLECTION_VIEW, toDoCollectionView);

            log('[bootstrap] created collection view');

            pageView = new PageView();

            Hub.register(moduleName.MAIN_PAGE_VIEW, pageView);

            log('[bootstrap] created page view');

            PubSub.publish(event.BOOTSTRAP_COMPLETE);

            // fire an event instaed.
//            Dom.append('body', pageView.render().$el);

            root.hub = Hub;

            log('<<<bootstrap.run');
        }
    };
});
