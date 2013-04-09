define([], function() {
    'use strict';

    /**
     *
     */
    return {

        /**
         *
         */
        IS_PRODUCTION : false,

        url : {
            LIST_TASKS : '/list/tasks'
        },

        event : {
            ADD_RANDOM_TASK  : 'add:random',
            REMOVE_ALL_TASKS : 'remove:all'
        },

        prefix : {
            TODO : 'todo-'
        },

        modelKey : {
            ID          : 'id',
            START_DATE  : 'startDate',
            TITLE       : 'title',
            DESCRIPTION : 'description'
        }
    };
});