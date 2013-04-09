var theList = [
    'core/Config',
    'i18n/Bundle',
    'utils/String',
    'utils/Debug',
    'utils/Dom',
    'views/PageView',
    'views/ToDoCollectionView',
    'models/ToDoModel',
    'collections/ToDoCollection'
];

var theCache = {};



window.define = function(items, factory) {
    var currentDefinition = theList.shift();

    var i, len, item;

    var args = [];

    for (i = 0, len = items.length; i < len; i++) {
        item = items[i];

        switch (item) {
            case 'text!../../templates/PageView.html':
                args.push(

// very very dirty hack!
['<h1><%= Bundle.TITLE %></h1>',
'<div id="<%= appPrefix %>container"></div>',
'<div id="<%= appPrefix %>controls"></div>'].join('')

                );
                break;
            case 'text!../../templates/PageView.controls.html':
                args.push(

['<a href="#" id="<%= appPrefix %>clean" class="<%= appPrefix %>btn-removeall">',
'<i></i><%= Bundle.REMOVE_ALL %></a>',
'<a href="#" id="<%= appPrefix %>add" class="<%= appPrefix %>btn-add">',
'<i></i><%= Bundle.ADD_RANDOM %></a>'].join('')

                );
                break;
            case 'text!../../templates/ToDoView.html':
                args.push(
[
'<span class="<%= appPrefix %>item" title="<%= description %>">',
'    <span class="<%= appPrefix %>title"><%= title %> <%= suffix %></span>',
'    <span class="<%= appPrefix %>btn-remove fr"',
'        data-<%= appPrefix %>action="delete"',
'        data-<%= appPrefix %>id="<%= id %>"',
'    ><i></i><%= Bundle.DELETE %></span>',
'</span>'
].join('')
                );
                break;
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