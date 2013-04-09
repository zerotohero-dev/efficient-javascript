define([
    'core/Config'
], function(
    Config
){
    'use strict';

    function noop(){}

    var result = {
        log     : noop,
        trace   : noop,
        warn    : noop,
        time    : noop,
        timeEnd : noop
    };

    if (Config.IS_PRODUCTION) {
        return result;
    }

    if (Config.LOG_LEVEL > 2) {

        /**
         *
         */
        result.trace = function(stuff) {
            console.log(stuff);
        };
    }

    /**
     *
     */
    result.log = function(stuff) {
        console.log(stuff);
    };

    /**
     *
     */
    result.warn = function(stuff) {
        console.warn(stuff);
    };

    /**
     *
     */
    result.time = function(timerId) {
        console.time(timerId);
    };

    /**
     *
     */
    result.timeEnd = function(timerId) {
        console.timeEnd(timerId);
    };

    return result;
});