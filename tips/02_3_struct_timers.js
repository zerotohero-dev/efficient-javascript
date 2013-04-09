window.Caller = {
    callMeMaybe: function () {
        var self = this;

        setTimeout(function () {
            console.log('Hi there!');

            self.callMeMaybe();
        }, 1000);
    }
};

window.Caller.callMeMaybe();

window.Caller = null; // will still leak.
delete window.Caller; // ditto.
