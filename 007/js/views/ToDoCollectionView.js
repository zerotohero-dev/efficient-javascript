define([
    'utils/Config',
    'utils/Debug',
    'utils/String',
    'backbone',
    'views/PageView',
    'views/ToDoView',
    'text!../../templates/PageView.container.html',
    'text!../../templates/PageView.controls.html'
], function(
    Config,
    Debug,
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

            return Backbone.View.prototype.initialize.apply(this, arguments);
        },

        /**
         *
         */
        // TODO: This method depends on selectors too much, refactor it.
        render : function() {
            var kDebugTimerId = 'TodoCollectionView.render',
                self          = this;

            Debug.time(kDebugTimerId);

            this.parent.$el.find('#container').empty();
            //window.document.getElementById('container').innerHTML = '';

            this.parent.$el.find('#container').append(pageViewContainerTmpl);
            //window.pageView.$el.find('#container').append(page...ntainerTmpl);

            this.collection.each(function(todo) {
                window.pageView.$el.find('#container').append(
                    (new ToDoView({
                        model  : todo,
                        parent : self
                    })).render().el
                );
            });

            this.parent.$el.find('#controls').html(pageViewControlsTmpl);
            //window.pageView.$el.find('#controls').html(pageViewControlsTmpl);

            Debug.timeEnd(kDebugTimerId);

            return Backbone.View.prototype.render.apply(this, arguments);
        }
    });
});
