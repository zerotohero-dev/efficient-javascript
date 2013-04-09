var ToDoView = Backbone.View.extend({
    className: 'todo-container',

    template: _.template(
        '<span class="todo-item" title="<%= description %>">' +
        '  <span class="todo-title"><%= title %></span>'      +
        '  <span class="btn-remove fr" data-action="delete"'  +
        '  ><i></i>delete</span>'                             +
        '</span>'
    ),

    initialize: function(options) {
        this.model.on('change',  this.render, this);

        options.parent.on('remove:all', this.handleDelete, this);

        Backbone.View.prototype.initialize.apply(this, arguments);
    },
    events: {
        'click span[data-action=delete]' : 'handleDelete'
    },
    handleDelete: function() {
        this.remove();
    },
    render: function() {
        this.$el.html(
            this.template(
                this.model.toJSON()
            ) + Math.floor(Math.random()*100%100)
        );

        return Backbone.View.prototype.render.apply(this, arguments);
    }
});
