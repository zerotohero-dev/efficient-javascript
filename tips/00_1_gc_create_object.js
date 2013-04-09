
Object.create(proto, attrs);

var newObject = new MyObject();

var primitiveStr = 'hello world';

var primitiveNumber = 42;

var a = [ ];  // allocates memory for the array and contained values

var o = { };  // allocates memory for an object and contained values

// Functions are nothing but (callable) objects.
function createComparator() {
    return function(a, b) { return a >= b; }
}

function getResult() {

    // returns a new object, every single call.
    return {compound: 'result', from: 'function'};
}

// watch out: b is a brand new array.
var b = a.slice(1);


var s2 = s.substr(0, 3); // s2 is a new string
// Since strings are immutable, JavaScript may decide to not allocate memory, but just store the [0, 3] range.

var a = ["ouais ouais", "nan nan"];
var a2 = ["generation", "nan nan"];
var a3 = a.concat(a2); // new array with 4 elements being the concatenation of a and a2 elements


