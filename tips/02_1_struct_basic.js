var Leaker = function(){};
Leaker.prototype = {
    init:function(){}
};

var cache = null;

function setupLeak() {
    if (cache) {return;}

    cache = new Leaker();
}

function destroyLeak() {
    cache = null;
}

/*****************************************************/

function foo1() {
    var bar = new LargeObject();

    bar.someCall();
}

foo1();

/*****************************************************/

function foo2() {
    var bar = new LargeObject();

    bar.someCall();

    return bar;
}

var b = foo2();
