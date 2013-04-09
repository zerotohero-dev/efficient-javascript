define([
    'jquery'
], function(
    $
) {
    'use strict';

    /**
     *
     */
    return {
        find   : function($el, selector) {return $($el).find(selector);},
        append : function($el, o       ) {return $($el).append(o);     },
        html   : function($el, o       ) {return $($el).html(o);       },
        empty  : function($el          ) {return $($el).empty();       },
        parent : function($el          ) {return $($el).parent();      },
        remove : function($el          ) {return $($el).remove();      },
        prevent: function(evt          ) {return evt.preventDefault(); },
        attr   : function($el, key     ) {return $($el).attr(key);     },

        /**
         *
         */
        getActionTarget : function(evt) {
            var target = evt.target;

            if (target.nodeName.toLowerCase() === 'i') {
                target = target.parentNode;
            }

            return target ? target : null;
        },

        /**
         *
         */
        createDiv : function() {
            return window.document.createElement('div');
        }
    };
});