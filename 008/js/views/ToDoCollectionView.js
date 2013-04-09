define([
    'utils/Debug',
    'utils/Config',
    'utils/String',
    'backbone',
    'views/PageView',
    'views/ToDoView',
    'text!../../templates/PageView.container.html',
    'text!../../templates/PageView.controls.html'
], function(
    Debug,
    Config,
    StringUtil,
    Backbone,
    PageView,
    ToDoView,
    pageViewContainerTmpl,
    pageViewControlsTmpl
) {
    'use strict';

    /**
     *
     */
    return Backbone.View.extend({

        /**
         *
         */
        initialize : function() {
            Debug.log('>>>TodoCollectionView.initialize');

            var self = this;

            this.collection.bind('add', function() {
                new ToDoView({
                    model  : self.collection.at(self.collection.length-1),
                    parent : self
                }).render();
            });

            this.on(Config.event.ADD_RANDOM_TASK, function() {
                var id    = StringUtil.generateId(),
                    title = StringUtil.generateRandomTitle( id ),
                    now   = (new Date()).getTime(),
                    key   = Config.modelKey,
                    item  = {};

                item[key.ID]          = id;
                item[key.START_DATE]  = now;
                item[key.TITLE]       = title;
                item[key.DESCRIPTION] = title;

                self.collection.add([item]);

                self.render();

                // ?
                setTimeout(function() {
                    window.document.body.scrollTop =
                        window.document.documentElement.scrollHeight;
                }, 0);
            });

            Debug.log('<<<TodoCollectionView.initialize');

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        // TODO: This method depends on selectors too much, refactor it.
        render : function() {
            Debug.log('>>>TodoCollectionView.render');

            var kDebugTimerId = 'TodoCollectionView.render',
                self          = this;

            Debug.time(kDebugTimerId);

            // TODO: if I depend this much on this.parent, maybe these should
            // all together go to a method of this.parent.
            this.parent.$el.find('#container').empty();

            this.parent.$el.find('#container').append(pageViewContainerTmpl);

            this.collection.each(function(todo) {
                Debug.trace('>>>TodoCollectionView.collection.each');

                self.parent.$el.find('#container').append(
                    (new ToDoView({
                        model  : todo,
                        parent : self
                    })).render().el
                );

                Debug.trace('<<<ToDoCollectionView.collection.each');
            });

            this.parent.$el.find('#controls').html(pageViewControlsTmpl);

            Debug.timeEnd(kDebugTimerId);

            Debug.log('<<<TodoCollectionView.render');

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
