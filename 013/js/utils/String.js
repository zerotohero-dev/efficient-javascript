define([
    'core/Config'
], function(
    Config
) {
    'use strict';

    var counter = 0;

    /**
     *
     */
    return {

        /**
         *
         */
        generateGuid : function() {
            return counter++;
        },

        /**
         *
         */
        generateId : function() {
            return Config.APP_PREFIX + this.generateGuid();
        },

        /**
         *
         */
        generateRandomTitle : function( id ) {
            return 'Random “To Do” — ' + id;
        },

        /**
         *
         */
        generateRandomSuffix : function() {
            return '' + Math.floor(Math.random()*100 % 100);
        }
    };
});