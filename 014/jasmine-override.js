var theList = [
    'core/Config',
    'utils/Debug',
    'core/PubSub',
    'i18n/Bundle',
    'utils/String',
    'utils/Dom',
    'core/Hub',
    'views/PageView',
    'views/ToDoCollectionView',
    'models/ToDoModel',
    'collections/ToDoCollection'
];

var theCache = {};


// very very dirty hack!
theCache['text!../../templates/PageView.html'] = [
'<h1><%= Bundle.TITLE %></h1>',
'<div id="<%= appPrefix %>container"></div>',
'<div id="<%= appPrefix %>controls"></div>'
].join('')


theCache['text!../../templates/PageView.controls.html'] = [
'<a href="#" id="<%= appPrefix %>clean" class="<%= appPrefix %>btn-removeall">',
'<i></i><%= Bundle.REMOVE_ALL %></a>',
'<a href="#" id="<%= appPrefix %>add" class="<%= appPrefix %>btn-add">',
'<i></i><%= Bundle.ADD_RANDOM %></a>'
].join('')


theCache['text!../../templates/ToDoView.html'] = [
'<span class="<%= appPrefix %>item" title="<%= description %>">',
'    <span class="<%= appPrefix %>title"><%= title %> <%= suffix %></span>',
'    <span class="<%= appPrefix %>btn-remove fr"',
'        data-<%= appPrefix %>action="delete"',
'        data-<%= appPrefix %>id="<%= id %>"',
'    ><i></i><%= Bundle.DELETE %></span>',
'</span>'
].join('')

window.define = function(items, factory) {
    var currentDefinition = theList.shift();

    var i, len, item;

    var args = [];

    var cat = '';

    for (i = 0, len = items.length; i < len; i++) {
        item = items[i];


        cat += item + ';';

var blen = 0;
        switch (item) {
            case 'backbone':
                args.push(window.Backbone);

//blen = args.length;

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

                } else {

throw 'not pushing !!!! ' + item;
                }
                break;
        }
    }

if (window.baz) {

}

    theCache[currentDefinition] = factory.apply(null, args);

//    return theCache[currentDefinition];
};

window.require = function(name) {
    return theCache[name];
}


