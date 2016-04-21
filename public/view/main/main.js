RAD.model('item', Backbone.Model.extend({
    defaults: {
        id:"",
        img:"",
        cost:"",
        optCost:"",
        information:"",
        shortinfo:"",
        quantity: 1,
    },
    idAttribute: "id"
}),false);

RAD.model('content', Backbone.Collection.extend({
    model:new RAD.model('item')
}));


RAD.view("view.main", RAD.Blanks.View.extend({
    url: 'view/main/main.html',
    events: {
        'tap .name': 'open',
        'tap .buy-button': "open",
    },
    model:new RAD.model('content'),
    press: function (event) {
      $('count').val()
    },
    onStartAttach: function () {
        var that = this;
        that.publish('view.router.setMainHeader');
        that.model.add(window.config.model);
    },
    goToContact:function(){
        this.publish('view.router.goToContacts',{
            extras:{
                backView: this.viewID,
            }
        });
    },
    open: function (e) {
        "use strict";
        var options = {
            backView: this.viewID,
            extras : {
                data : e.currentTarget.parentNode.parentNode.attributes.getNamedItem('data-index').value
            }
        };


        this.publish('view.router.goToResult', options);
    }
}));