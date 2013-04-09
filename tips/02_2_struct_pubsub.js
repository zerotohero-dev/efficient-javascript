
var Hub = {
    privates : {
        observers: {}
    },

    bind: function(observer, subject, message, delegate) {
        // Use id of the subject as key, not the subject itself.
        var id = subject.id;

        this.privates.observers[id]          = this.privates.observers[id] || {};
        this.privates.observers[id][message] = this.privates.observers[id][message] || [];

        this.privates.observers[id][message].push({
            // a ref to the observer.
            observer : observer,
            delegate : delegate
        });
    },

    trigger: function(subject, message) {
        var id        = subject.id,
            observers = this.privates.observers[id][message],
            observer,
            i,
            len;

        for (i=0, len = observers.length; i<len; i++) {
            mixed = observers[i];
            mixed.delegate.call(null, subject, {});
        }
    }
};

var counter = 0;
function View(id) {this.id = 'view'+(counter++);}
function Model()  {}

/***************************************************************/

var observers = {};
obsevers.mainView = new View();

var subjects = {};
subjects.mainModel = new Model();

function bind() {
    Hub.bind(
        observers.mainView, subjects.mainModel, "data:changed",
        function(sender, args) {
            console.log("Hello");
        }
    );
}

function trigger() {
    Hub.trigger(subjects.mainModel, "data:changed");
}

function unbind() {
    delete observers.mainView; // mainView will still leak!
    delete subjects.mainModel;
}

bind();
trigger();
unbind();



