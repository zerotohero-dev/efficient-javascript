/********************************************/

showLoadingIndicator();
doSomethingExpensive();

/********************************************/

function switchViews() {
    setTimeout(function() {
        showLoadingIndicator();
    }, 0);

    setTimeout(function() {
        doSomethingExpensive();
    }, 50);
}

/********************************************/

function(1 to 100 ) {
    item.innerHTML = 'item + i; // 100 x reflow.
    list.appendChild(item)
}
