var cache;

var Leaker = function(){};

Leaker.prototype = {
    init:function() {
        if (cache) {return;}

        console.log("object: %o", this);
    }
};

function setupLeak() {
    cache = new Leaker();
    cache.init();
}

function destroyLeak() {
    cache = null;

    //console.clear();
}