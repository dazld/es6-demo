
/*global $ */

var APP = {
    models: {},
    collections: {},
    init: function() {
        $(function() {
            var p = new APP.models.Person();
            console.log('started', p.templateData());
        });

    }
};

APP.init();
