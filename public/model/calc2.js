RAD.model('calc', Backbone.Model.extend({
    defaults: {
        purprice: '',
        moamount: '',
        misccharge: '',
        commper: '',
        chcondo: true,
        chsinglefam: true,
        commissionOwner: true,
        miscfeeOwner: true,
        settfeeOwner: true,
        titleinsOwner: true,
        tsearchOwner: true,
        lenpolicyOwner: true,
        condopudOwner: true,
        envendOwner: true,
        fform9Owner: true,
        recordingOwner: true,
        stampmortOwner: true,
        inttaxOwner: true,
        stampdeedOwner: false,
        surveyfeeOwner: true,
        legalfeeOwner: true,
        wirefeeOwner: true,
        courierfeeOwner: true,
        filestorfeeOwner: true,
        digidocsOwner: true,
        escrowfeeOwner: true,
        munlienseOwner: true,
        legalfeebuyOwner: true,
        wirefeebuyOwner: true,
        courierfeebuyOwner: true,
        filestorfeebuyOwner: true,
        escrowfeebuyOwner: true,
        legalfeesellOwner: true,
        wirefeesellOwner: true,
        courierfeesellOwner: true,
        filestorfeesellOwner: true,
        escrowfeesellOwner: true,
        result:{
            settfee: 	 0,
            titleins: 	 0,
            stampdeed:	 0,
            tsearch: 	 0,
            munliense:	 0,
            misccharge:	 0,
            lenpolicy:	 0,
            envend: 	 0,
            fform9: 	 0,
            stampmort: 	 0,
            inttax:		 0,
            commission:  0,
            condopud: 	 0,
            recording:	 0,
            digidocs: 	 0,
            surveyfee: 	 0,
            legalfee:	 0,
            wirefee:	 0,
            courierfee:	 0,
            filestorfee: 0,
            escrowfee:	 0,
            btotal: 	 0,
            stotal: 	 0
        }
    },
    initialize: function() {
        this.bind('change', function() {
            this.compute();
        });
        this.on("invalid",function(model,error){
            //alert(error);
        });
    },
    validate: function(attrs, options) {
        if (isNaN(parseInt(attrs.purprice)) || (attrs.moamount != '' && isNaN(parseInt(attrs.moamount))) || (attrs.misccharge != '' && isNaN(parseInt(attrs.misccharge))) || (attrs.commper != '' && isNaN(parseInt(attrs.commper))) )
        {
            return "Numbers only";
        }

        if (parseInt(attrs.purprice) > 1e20 || parseInt(attrs.moamount) > 1e20 || parseInt(attrs.misccharge) > 1e20)
        {
            return "Incorrect number";
        }

        if (parseInt(attrs.commper)> 100 || parseInt(attrs.commper)< 0 )
        {
            return "Incorrect percents";
        }
    },
    compute: function () {
        var config = window.config;
        var purprice = this.get('purprice');
        var moamount = config.moamount;
        var misccharge = config.misccharge;
        var chsinglefam = this.get('chsinglefam');
        var chcondo = this.get('chcondo');
        var settfee = config.settfee;
        var titleins = config.titleins;
        var tsearch = config.tsearch;
        var lenpolicy = config.lenpolicy;
        var condopud = config.condopud;
        var envend = config.envend;
        var fform9 = config.fform9;
        var recording = config.recording;
        var stampmort = config.stampmort;
        var inttax = config.inttax;
        var stampdeed = config.stampdeed;
        var surveyfee = config.surveyfee;
        var btotal = config.btotal;
        var stotal = config.stotal;
        var note = config.note;
        var digidocs = config.digidocs;
        var totalpolicy = config.totalpolicy;
        var legalfee = config.legalfee;
        var wirefee = config.wirefee;
        var courierfee = config.courierfee;
        var filestorfee = config.filestorfee;
        var escrowfee = config.escrowfee;
        var munliense = config.munliense;
        var x = config.x;
        var y = config.y;
        var commper = 0;
        var commission = 0;
        var pud = 0;

        if (this.get('moamount') == "") {
            moamount = 0;
        }
        else {
            moamount = this.get('moamount');
        }
        if (this.get('misccharge') == "") {
            misccharge = 0;
        }
        else {
            misccharge = this.get('misccharge');
        }
        chsinglefam = this.get('chsinglefam');
        chcondo = this.get('chcondo');
        commper = 0;
        commission = 0;
        if (this.get('commper') != "") {
            commper = this.get('commper');
            commission = purprice * commper / 100;
        }


        // title insurance calculations
        if (purprice < 100000) {
            titleins = (purprice / 1000) * 5.75;
        }
        else if (purprice >= 100000 && purprice < 1000000) {
            x = purprice - 100000;
            y = (x / 1000) * 5;
            titleins = y + 575;
        }
        else if (purprice >= 1000000 && purprice < 5000000) {
            x = purprice - 1000000;
            y = (x / 1000) * 2.5;
            titleins = y + 5075;
        }
        else if (purprice >= 5000000 && purprice < 10000000) {
            x = purprice - 5000000;
            y = (x / 1000) * 2.25;
            titleins = y + 15075;
        }
        else {
            x = purprice - 10000000;
            y = (x / 1000) * 2;
            titleins = y + 26325;
        }
        //end of title insurance calculations

        stampdeed = (purprice / 1000) * 7;
        stampmort = (moamount / 1000) * 3.5;
        inttax = (moamount / 1000) * 2;
        //decide if there is need for lenders policy
        if (moamount == 0) {
            lenpolicy = 0;
        }
        else {
            lenpolicy = 250;
            totalpolicy = titleins + lenpolicy;
        }

        //end of lenders policy section
        //fla form 9 setcion
        if (moamount == 0) {
            fform9 = 0;
        }
        else {
            fform9 = totalpolicy * 0.10;
        }
        //end fla form 9 setion

        if (moamount == 0) {
            recording = 27;
        }
        else {
            recording = 207;
        }

        if (moamount == 0) {
            envend = 0;
        }
        else {
            if (this.get('chcondo')) {
                //chcondo = 25;
                //pud = 0;
                condopud = 200;
            }
            else {
                condopud = 0;
                //chcondo = 0;
                //pud = 25;
            }

        }

        if (chsinglefam && (moamount > 0)) {
            surveyfee = 450;
            //termitefee = 100;
        }
        else {
            surveyfee = 0;
            //termitefee = 0;
        }

        settfee = 350;
        if  (this.get('munlienseOwner')){
            munliense = 180;
            btotal += parseInt(munliense);
        }
        else {
            stotal += parseInt(munliense);
        }
        if  (this.get('escrowfeebuyOwner')){
            escrowfee = 35;
            btotal += parseInt(escrowfee);
        }
        if  (this.get('escrowfeesellOwner')){
            escrowfee = 35;
            stotal += parseInt(escrowfee);
        }
        if  (this.get('filestorfeebuyOwner')) {
            filestorfee = 45;
            btotal += parseInt(filestorfee);
        }
        if  (this.get('filestorfeesellOwner')) {
            filestorfee = 45;
            stotal += parseInt(filestorfee);
        }
        if  (this.get('courierfeebuyOwner')){
            courierfee = 105;
            btotal += parseInt(courierfee);
        }
        if  (this.get('courierfeesellOwner')){
            courierfee = 105;
            stotal += parseInt(courierfee);
        }
        if  (this.get('wirefeebuyOwner')){
            wirefee = 85;
            btotal += parseInt(wirefee);
        }
        if  (this.get('wirefeesellOwner')){
            wirefee = 85;
            stotal += parseInt(wirefee);
        }
        if	(this.get('legalfeebuyOwner')) {
            legalfee = 1500;
            btotal += parseInt(legalfee);
        }
        if	(this.get('legalfeesellOwner')) {
            legalfee = 1500;
            stotal += parseInt(legalfee);
        }
        if (this.get('commissionOwner')) {
            btotal += parseInt(commission);
        }
        else {
            stotal += parseInt(commission);
        }
        if (this.get('miscfeeOwner')) {
            btotal += parseInt(misccharge);
        }
        else {
            stotal += parseInt(misccharge);
        }
        if (this.get('settfeeOwner')) {
            btotal += parseInt(settfee);
        }
        else {
            stotal += parseInt(settfee);
        }
        if (this.get('titleinsOwner')) {
            btotal += parseInt(titleins);
        }
        else {
            stotal += parseInt(titleins);
        }
        if (this.get('tsearchOwner')) {
            btotal += parseInt(tsearch);
        }
        else {
            stotal += parseInt(tsearch);
        }
        if (this.get('lenpolicyOwner')) {
            btotal += parseInt(lenpolicy);
        }
        else {
            stotal += parseInt(lenpolicy);
        }
        if (this.get('condopudOwner')) {
            btotal += parseInt(condopud);
        }
        else {
            stotal += parseInt(condopud);
        }
        if (this.get('envendOwner')) {
            btotal += parseInt(envend);
        }
        else {
            stotal += parseInt(envend);
        }
        if (this.get('fform9Owner')) {
            btotal += parseInt(fform9);
        }
        else {
            stotal += parseInt(fform9);
        }
        if (this.get('recordingOwner')) {
            btotal += parseInt(recording);
        }
        else {
            stotal += parseInt(recording);
        }
        if (this.get('stampmortOwner')) {
            btotal += parseInt(stampmort);
        }
        else {
            stotal += parseInt(stampmort);
        }
        if (this.get('inttaxOwner')) {
            btotal += parseInt(inttax);
        }
        else {
            stotal += parseInt(inttax);
        }
        if (this.get('stampdeedOwner')) {
            btotal += parseInt(stampdeed);
        }
        else {
            stotal += parseInt(stampdeed);
        }
        if (this.get('surveyfeeOwner')) {
            btotal += parseInt(surveyfee);
        }
        else {
            stotal += parseInt(surveyfee);
        }
        if (this.get('digidocsOwner')) {
            btotal += parseInt(digidocs);
        }
        else {
            stotal += parseInt(digidocs);
        }
        var result;
        settfee = 350;

        result = {
            settfee: 	 parseInt(settfee),
            titleins: 	 parseInt(titleins),
            stampdeed:	 parseInt(stampdeed),
            tsearch: 	 parseInt(tsearch),
            munliense:	 parseInt(munliense),
            misccharge:	 parseInt(misccharge),
            lenpolicy:	 parseInt(lenpolicy),
            envend: 	 parseInt(envend),
            fform9: 	 parseInt(fform9),
            stampmort: 	 parseInt(stampmort),
            inttax:		 parseInt(inttax),
            commission:  parseInt(commission),
            condopud: 	 parseInt(condopud),
            recording:	 parseInt(recording),
            digidocs: 	 parseInt(digidocs),
            surveyfee: 	 parseInt(surveyfee),
            legalfee:	 parseInt(legalfee),
            wirefee:	 parseInt(wirefee),
            courierfee:	 parseInt(courierfee),
            filestorfee: parseInt(filestorfee),
            escrowfee:	 parseInt(escrowfee),
            btotal: 	 parseInt(btotal),
            stotal: 	 parseInt(stotal)
        };
        this.set({result: result});
    }
}));