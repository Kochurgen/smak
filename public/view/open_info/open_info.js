RAD.view("view.open_info", RAD.Blanks.View.extend({
    url: 'view/open_info/open_info.html',
    events: {
        'tap ul li': 'open',
        'tap .info': 'openInfo'
    },
    item_info:"s",
    onNewExtras:function (extras) {
        var that = this;
        this.item_info = extras.data;
    },
    onStartAttach: function () {
        var that = this;
        that.publish('view.router.setMainHeader');
        that.render();
        // $('#result').html(this.item_info)
    },
    goToContact:function(){
        this.publish('view.router.goToContacts',{
            extras:{
                backView: this.viewID
            }
        });
    }
}));