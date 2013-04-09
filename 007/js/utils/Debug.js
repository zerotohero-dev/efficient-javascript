define([
    'utils/Config'
], function(
    Config
){
    'use strict';

    function noop(){}

    if (Config.IS_PRODUCTION) {
        return {
            log     : noop,
            time    : noop,
            timeEnd : noop
        };
    }

    /**
     *
     */
    return {

        /**
         *
         */
        log : function(stuff) {
            console.log(stuff);
        },

        /**
         *
         */
        time : function( timerId ) {
            console.time( timerId );
        },

         /**
          *
          */
        timeEnd : function( timerId ) {
            console.timeEnd( timerId );
        }
    };
});