RAD.model('sopping', Backbone.Collection.extend({
    model:new RAD.model('item')
}));

RAD.view("view.shopping_cart", RAD.Blanks.View.extend({
    url: 'view/shopping_cart/shopping_cart.html',
    events: {
        'tap ul li': 'open',
        'tap .info': 'openInfo'
    },
    model: new RAD.model('sopping'),
    onNewExtras:function (extras) {
        'use strict';
        var that = this;
        console.log(extras);
        that.model.set(extras.data)
    }
}));