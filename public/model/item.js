RAD.model('item', Backbone.Model.extend({
    defaults: {
        id:0,
        img:"",
        cost:"",
        optCost:"",
        name:"",
        information:"",
        quantity: 1,
        resultSumm: function () {
            if(this.quantity < 10 ) {
                return this.quantity * this.cost
            } else {
                return this.quantity * this.optCost
            }
        }
    }
}),false);