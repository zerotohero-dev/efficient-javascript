define([
    'utils/Debug',
    'utils/Config',
    'backbone',
    'models/ToDoModel'
], function(
    Debug,
    Config,
    Backbone,
    ToDoModel
) {
    'use strict';

    /**
     *
     */
    return Backbone.Collection.extend({
        model : ToDoModel,
        url   : Config.url.LIST_TASKS,

        /**
         *
         */
        initialize : function() {
            Debug.trace('>>>ToDoCollection.initialize');

            return Backbone.Collection.prototype.initialize.apply(this,
                arguments);
        }
    });
});
