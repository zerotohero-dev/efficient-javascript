define([
    'utils/Debug',
    'utils/Config',
    'backbone'
], function(
    Debug,
    Config,
    Backbone
) {
    'use strict';

    /**
     *
     */
    return Backbone.Model.extend({
        url : Config.url.LIST_TASKS,

        /**
         *
         */
        initialize : function() {
            Debug.trace('>>>ToDoModel.initialize');

            return Backbone.Model.prototype.initialize.apply(this, arguments);
        }
    });
});
