function testProperties() {
    $(document.body).data('property', 'value');

    console.log($(document.body).data('property'));
}

function jQueryLeaks() {
    $('<div/>')
        .html('parsed version of extremely large JSON response')
        .data('do not', 'panic')                                  // LEAKS
        .click(function(evt){
            evt.preventDefault();
            handleEvent(evt);
        })                                                        // LEAKS
        .appendTo('#MasterContainer');

    document.getElementById('MasterContainer').innerHTML = '';
}

/*
    (1) Use jQuery methods (`empty`, `remove` ...) to remove elements
            (can have performance overhead: recurses over children)
    (2) Tweaks:
        1. Use `$elem.removeData().unbind()` for the items that you know you've
           bound events and set data.
           Then you can safely use native DOM methods w/o fear of leaks.
        2. Keep number of event handlers to a minimum (use event delegation).
        3. `$elem.detach()` then yield with `setTimeout( $elem.remove() )`
    (3) Inspect $.cache. 99% of jQuery leaks will be there.
    (4) Use "Chrome Developer Tools"
    (5) It's really hard to detect leaks.
        Strive to write leak free code from day one.
 */
