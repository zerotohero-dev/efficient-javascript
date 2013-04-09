define([
    'utils/Debug'
], function(
    Debug
) {
    var state = {},
        warn  = Debug.warn;

    return  {

        /**
         * @function {static} PubSubHub.publish
         *
         * Publishes the message to all registered observers.
         *
         * @param {String} message - the message to publish.
         * @param {Object} sender  - (Optional) The originator of the message.
         * @param {Object} evtArgs - (Optional) Additional event arguments.
         */
        publish : function(message, sender, evtArgs) {
            if (!message) {
                warn('PubSubHub.publish: no message given to publish');

                return;
            }

            var observers = state[message], i, len, observer;

            if (!observers) {
                warn( 'PubSubHub.publish: Message "' + message +
                    '" has no observer collection.');

                return;
            }

            for (i = 0, len = observers.length; i < len; i++) {
                observer = observers[i];

                if (observer) {
                        observer.notify(message, sender, evtArgs);
                }


            }

            for (i = 0, len = observers.length; i < len; i++) {
                obserer = observers[i];

                if (!observer) {
                    observers.splice(i, 1);
                    i--;
                    len=observers.length;
                }
            }
        },

        /**
         * @function {static} PubSubHub.subscribe
         *
         * Subscribes an observer to a message.
         *
         * @param {Object} observer - The observer that will subscribe.
         * @param {String} message  - The message to subscribe to.
         */
        subscribe : function(observer, message) {
            if (typeof observer !== 'object') {
                warn('PubSubHub.subscribe: will not subscribe; ' +
                    'observer is NOT an object.');

                return;
            }

            if (!message) {
                warn('PubSubHub.subscribe: will not subscribe; ' +
                    'no message has been provided to subscribe to.');

                return;
            }

            state[message] = state[message] || [];

            var i, len, observers = state[message];

            for (i = 0, len = observers.length; i < len; i++) {
                if (observers[i] === observer) {
                    warn('PubSubHub.subscribe: Observer has already ' +
                        'been subscribed. Exiting.');

                    return;
                }
            }

            observers.push(observer);
        },

        /**
         * @function {static} PubSubHub.unsubscribe
         *
         * Unsubscribes an observer from a message.
         *
         * @param {Object} observer - The observer that will unsubscribe.
         * @param {String} message  - The message to unsubscribe from.
         */
        unsubscribe : function(observer, message) {
            state[message] = state[message] || [];

            var i, key, len, observers;

            if (message) {
                observers = state[message];

                for (i = 0, len = observers.length; i < len; i++) {
                    if (observers[i] === observer) {
                        observers[i] = null;

                        break;
                    }
                }

                return;
            }

            for(key in state) {
                if (state.hasOwnProperty(key)) {
                    observers = state[key];

                    for (i = 0, len = observers.length; i < len; i++) {
                        if (observers[i] === observer) {
                            observers[i] = null;

                            break;
                        }
                    }
                }
            }
        }
    };
});