function bindEvents() {
    var el = document.getElementById('SomeNode');
    el.onclick = function() {};
}

bindEvents();

document.getElementById('SomeNode').parentNode.removeChild(
    document.getElementById('SomeNode')
);

// IE < 8 is buggy and will leak.

function bindEventsNoLeak1() {
    var el = document.getElementById('SomeNode');

    el.onclick = function() {
    };

    el = null;
}

function bindEventsNoLeak2() {
    // Look ma, no reference to `el`!

    document.getElementById('SomeNode').onclick = function() {
    };
}
