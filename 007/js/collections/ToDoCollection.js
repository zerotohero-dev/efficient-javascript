define([
    'utils/Config',
    'backbone',
    'models/ToDoModel'
], function(
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
        url   : Config.url.LIST_TASKS
    });
});
