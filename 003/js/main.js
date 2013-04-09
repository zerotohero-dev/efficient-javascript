var pageView = new PageView();

$('body').append(pageView.render().$el);

todos = new ToDoCollection();

todos.add(ToDoCollectionCache);

toDoCollectionView = new ToDoCollectionView({collection: todos});

toDoCollectionView.render();
