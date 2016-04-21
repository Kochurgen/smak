(function (document, window) {
    'use strict';

    window.isBrowser = (!(document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1));
    if (document.URL.indexOf('http:///') > -1) {
        window.isBrowser = true;
    }

    //window.isBrowser = false;

    window.whatdevice = (function () {
        var platform = navigator.platform.toLowerCase().split(' ');
        if (platform[0] == 'linux') {
            platform[0] = 'android';
        }
        if (platform[0] == 'ipod,touch')
            platform[0] = 'ipod';
        return platform[0];
    })();

    var scripts = [
        //lib
        "lib/accounting.min.js",
    //model
        "model/item.js",
        "model/item_info.js",
        "model/calc.js",
        "model/content.js",
        "model/shoppingCart",
        "js/iscroll-lite.js",

        //view
        "view/main/main.js",
        "view/signup/signup.js",
        "view/item_info/item_info.js",
        "view/shopping_cart/shopping_cart.js",
        "view/contacts/contacts.js",
        "view/router/router.js",
        "view/open_info/open_info.js",

        //services
        "service/calculation.js",

        //configuration
        "src/configuration.js",
        "src/application.js"


    ];



    function onEndLoad() {
        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: true,
                defaultAnimation: 'slide',
                animationTimeout: 30,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);


}(document, window));