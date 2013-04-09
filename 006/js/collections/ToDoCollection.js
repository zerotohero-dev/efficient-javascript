define([
    'backbone',
    'models/ToDoModel'
], function(
    Backbone,
    ToDoModel
) {
    'use strict';

    /**
     *
     */
    return Backbone.Collection.extend({
        model : ToDoModel,
        url   : '/tasks'
    });
});
