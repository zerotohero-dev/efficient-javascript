function Container(title, root) {
    this.title = title;
    this.el    = root;
}

window.container = new Container(
    'Hello World',
    document.getElementById('MasterContainer')
);                                                               // ( {OBJ-1} )

document.body.innerHTML = '';

console.log( window.container.el );                              // <DOMNode>
console.log( window.container.el.parentNode );                   // null

// window.container -> {OBJ-1} -> el -> <DOMNode(detached)>      // ( {NODE-1} )

window.container = new Container('Hello Stars',
    document.getElementById('MasterContainer'));                 // ( {OBJ-2} )

// window.container -> {OBJ-2}
// R.I.P. {OBJ-1}
// R.I.I. {NODE-1}

document.body.innerHTML = '';

// window.container -> {OBJ-2} -> el -> <DOMNode(detached)>      // ( {NODE-2} )

delete window.container.el;

// R.I.P {NODE-2}

delete window.container;

// R.I.P. {OBJ-2}