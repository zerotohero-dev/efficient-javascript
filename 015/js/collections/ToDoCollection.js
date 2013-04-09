define([
    'utils/Debug',
    'core/Config',
    'backbone',
    'models/ToDoModel'
], function(
    Debug,
    Config,
    Backbone,
    ToDoModel
) {
    'use strict';

    var trace = Debug.trace;

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
            trace('>>>ToDoCollection.initialize<<<');

            return Backbone.Collection.prototype.initialize.apply(this,
                arguments);
        }
    });
});
