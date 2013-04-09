var ToDoCollection = Backbone.Collection.extend({
    model: ToDoModel,
    url: '/tasks'
});
