var PageView = Backbone.View.extend({
    template: _.template(
        '<div id="container"></div>' +
        '<div id="controls"></div>'
    ),
    events: {
        'click #add'   : 'addTodo',
        'click #clean' : 'removeAllTodos'
    },
    addTodo: function() {
        toDoCollectionView.trigger('add:random');
    },
    removeAllTodos: function() {
        toDoCollectionView.trigger('remove:all');
    },
    render: function() {
        this.$el.html(this.template());

        return Backbone.View.prototype.render.apply(this, arguments);
    }
});
