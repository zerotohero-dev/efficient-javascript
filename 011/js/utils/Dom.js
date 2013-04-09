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
        empty  : function($el          ) {return $($el).empty();       }
    };
});