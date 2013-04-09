define([], function() {
    'use strict';

    /**
     *
     */
    return {
        ROOT_NAMESPACE : 'udemy',

        APP_PREFIX : 'udemy-',

        /**
         * Adds detailed trace informatin for LOG_LEVEL > 2.
         */
        LOG_LEVEL : 1,

        /**
         *
         */
        IS_PRODUCTION : false,

        url : {
            LIST_TASKS : '/list/tasks'
        },

        selector : {
            PAGE_CONTAINER  : '#udemy-container',
            PAGE_CONTROLS   : '#udemy-controls',
            BTN_ADD         : '#udemy-add',
            BTN_CLEAN       : '#udemy-clean',
            BTN_DELETE      : 'span[data-action=delete]'
        },

        className : {
            TASK_CONTAINER : 'udemy-container'
        },

        moduleName : {
            MAIN_PAGE_VIEW       : 'pageView',
            MAIN_COLLECTION_VIEW : 'collectionView'
        },

        event : {
            RECEIVED_NEW_TASK          : 'add:new',
            ADD_RANDOM_TASK_TRIGGERED  : 'add:random',
            REMOVE_ALL_TASKS_TRIGGERED : 'remove:all',
            PAGE_VIEW_RENDERED         : 'pageview:render',
            RENDER_BATCH_STARTED       : 'render:batchstart',
            TASK_INITIALIZED           : 'todo:create',
            BOOTSTRAP_COMPLETE         : 'app:inited',
            TASK_DESTRUCTED            : 'todo:destructed'
        },

        modelKey : {
            ID          : 'id',
            START_DATE  : 'startDate',
            TITLE       : 'title',
            DESCRIPTION : 'description'
        }
    };
});