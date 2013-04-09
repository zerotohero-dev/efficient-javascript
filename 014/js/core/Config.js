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
        IS_PRODUCTION : true,

        /**
         *
         */
        url : {
            LIST_TASKS : '/list/tasks'
        },

        /**
         *
         */
        selector : {
            PAGE_CONTAINER  : '#udemy-container'               ,
            PAGE_CONTROLS   : '#udemy-controls'                ,
            BTN_ADD         : '#udemy-add'                     ,
            BTN_CLEAN       : '#udemy-clean'                   ,
            BTN_DELETE      : 'span[data-udemy-action=delete]' ,
            BTN_DELETE_TMPL : '[data-udemy-id={0}]'
        },

        /**
         *
         */
        className : {
            TASK_CONTAINER : 'udemy-container'
        },

        /**
         *
         */
        attribute : {
            DATA_ID : 'data-udemy-id'
        },

        /**
         *
         */
        moduleName : {
            MAIN_PAGE_VIEW       : 'pageView',
            MAIN_COLLECTION_VIEW : 'collectionView'
        },

        /**
         *
         */
        event : {
            ADD_RANDOM_TASK_TRIGGERED  : 'add:random'       ,
            BOOTSTRAP_COMPLETE         : 'app:inited'       ,
            DELETE_TASK_TRIGGERED      : 'delete:todo'      ,
            RECEIVED_NEW_TASK          : 'add:new'          ,
            PAGE_VIEW_RENDERED         : 'pageview:render'  ,
            REMOVE_ALL_TASKS_TRIGGERED : 'remove:all'       ,
            RENDER_BATCH_STARTED       : 'render:batchstart',
            TASK_DESTRUCTED            : 'todo:destructed'  ,
            TASK_INITIALIZED           : 'todo:create'      ,
            TASK_APPENDED              : 'todo:append'
        },

        /**
         *
         */
        modelKey : {
            ID          : 'id'          ,
            START_DATE  : 'startDate'   ,
            TITLE       : 'title'       ,
            DESCRIPTION : 'description'
        }
    };
});