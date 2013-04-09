function nill() {};

function XHRLeak() { // IE < 9
    var ajax = new XMLHttpRequest();

    ajax.open('GET', '/service/endpoint', true);

    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4 && ajax.status == 200) {
            doMagic(ajax.responseText);

            // ajax.onreadystatechange = function(){};
            // ajax.onreadystatechange = nill;
            // ajax = null;
        }
    };

    ajax.send('');
}
