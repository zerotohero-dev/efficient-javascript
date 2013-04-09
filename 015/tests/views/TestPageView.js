describe('PageView', function() {
    it('SHOULD render', function() {
        var PubSub   = require('core/PubSub');
        var PageView = require('views/PageView');

        var pageView = new PageView();

        spyOn(pageView, 'resetContainer').andCallThrough();
        spyOn(Backbone.View.prototype, 'render');
        spyOn(PubSub, 'publish');

        pageView.render();

        expect(pageView.resetContainer).toHaveBeenCalled();

        expect(PubSub).toBeDefined();

        expect(PubSub.publish).toHaveBeenCalled();
        expect(PubSub.publish.mostRecentCall.args[0]).toEqual('pageview:render');

        expect(Backbone.View.prototype.render).toHaveBeenCalled();

        expect(pageView.$el.find('#udemy-container').length).toEqual(1);
        expect(pageView.$el.find('#udemy-controls').length).toEqual(1);
        expect(pageView.$el.find('#udemy-add').length).toEqual(1);
        expect(pageView.$el.find('#udemy-clean').length).toEqual(1);
    });
});
