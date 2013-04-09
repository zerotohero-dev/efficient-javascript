/*
    Below will leak in IE version < 8
    (IE8+ with compatibility mode set to lower IE versions will leak too)
 */

function selfRefLeak() {
    var el = document.createElement('div');
    el.foo = el;
}

function functionPointerLeak() {
    var el = document.createElement('div');
    el.foo = el.setAttribute;
}

function indirectReferenceLeak() {
    var el1 = document.createElement('div');
    var el2 = document.createElement('div');
    el1.foo = el2;
    el2.bar = el1;
}

function circularExpandoLeak() {
    var x = {};
    x.el = document.createElement('div');
    x.el.expando = x;
}

function parentCleanupLeak() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    el.expando = el;
    el.parentElement.innerHTML = '';
}

function closureLeak() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    el.onclick = function () {};
    el.removeNode();
}

function closureLeakParentCleanup() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    el.onclick = function () {};
    el.parentNode.innerHTML = '';
}
