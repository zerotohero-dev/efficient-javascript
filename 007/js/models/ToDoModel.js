define([
    'utils/Config',
    'backbone'
], function(
    Config,
    Backbone
) {
    'use strict';

    /**
     *
     */
    return Backbone.Model.extend({url : Config.url.LIST_TASKS});
});
