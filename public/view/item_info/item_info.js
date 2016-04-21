RAD.view("view.item_info", RAD.Blanks.View.extend({
    url: 'view/item_info/item_info.html',
    events: {
        'tap ul li': 'open',
        'tap .info': 'openInfo',
        'tap .buy-button': "goToShopCart",
        'tap .minus': "itemButtonMinus",
        'tap .plus':"itemButtonPlus",
        'keyup .counter': "keyupQuantity"
    },
    quantityMax: 999,
    quantity: 1,
    model: RAD.model('item_info'),
    onNewExtras:function (extras) {
        'use strict';
        var that = this;
        var test = Backbone.Model.extend();
        that.model.set(RAD.model('content').get(extras.data).toJSON());
        localStorage.setItem('smakjittya', JSON.stringify(that.model));
    },
    _filterQuantity: function (quantity) {
        var value = quantity;
        if (value > this.quantityMax) {
            return this.quantityMax;
        }
        if (value < 1) {
            return 1;
        }
        return value;
    },
    itemButtonMinus: function () {
        this.quantity = this._filterQuantity(this.quantity - 1);
        this.model.set('quantity', this.quantity);
    },
    itemButtonPlus: function () {
        this.quantity = this._filterQuantity(this.quantity + 1);
        this.model.set('quantity', this.quantity);
    },
    keyupQuantity: function (event) {
        var $input = this.$(event.currentTarget);
        this.quantity = this._filterQuantity($input.val());
        this.model.set('quantity', this.quantity);
        $input.val(this.quantity); // no rerender
    },
    onInitialize: function () {
        'use strict';
        var that = this;
        var test = Backbone.Model.extend();
        that.publish('view.router.setMainHeader');

        // var item = localStorage.getItem('smakjittya');
        // that.model.set(JSON.parse(item));
    },
    onStartAttach: function () {
        'use strict';
        var that = this;
        that.render();
        that.quantity=1;
    },
    goToContact:function(){
        this.publish('view.router.goToContacts',{
            extras:{
                backView: this.viewID
            }
        });
    },
    open: function (e) {
        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.item_info"
        };

        options.extras = {data: e.currentTarget.innerHTML};

        this.publish('navigation.show', options);
    },
    openInfo: function (e) {
        "use strict";
        var options = {
            extras : {
                data : e.currentTarget.attributes.getNamedItem('data-info').value
            }
        };
        this.publish('view.router.openInfo', options);
    },
    goToShopCart: function (e) {
        "use strict";
        var options = {
            extras : {
                data : this.model.toJSON()
            }
        };
        this.publish('view.router.goToShopCart', options);
    }
}));