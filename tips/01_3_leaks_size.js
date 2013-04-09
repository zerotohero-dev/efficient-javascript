function willLeak() {
    var data = 'while(1);throw"";{"list":"le extremely large JSON response"}';

    doStuffWithData(data);

    function Context() {
    }

    return Context;
}
