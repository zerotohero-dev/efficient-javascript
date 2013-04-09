var theList = [
    'views/ToDoView',
    'views/PageView'
];

var theCache = {};



window.define = function(items, factory) {
    var currentDefinition = theList.shift();

    var i, len, item;

    var args = [];

    for (i = 0, len = items.length; i < len; i++) {
        item = items[i];

        switch (item) {
            case 'backbone':
                args.push(window.Backbone);
                break;
            case 'jquery':
                args.push(window.jQuery);
                break;
            case 'underscore':
                args.push(window._);
                break;
            default:
                if (theCache[item]) {
                    args.push(theCache[item]);
                }
        }
    }

    theCache[currentDefinition] = factory.apply(null, args);

    return {};
};

window.require = function(name) {
    return theCache[name];
}