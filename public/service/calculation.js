RAD.namespace('calculation', (function () {
    'use strict';
    var camera = {};

    calculation.compute = function () {
        var config = window.config;
        var purprice = RAD.model('calc').get('purprice');
        var moamount = config.moamount;
        var misccharge = config.misccharge;
        var chsinglefam = RAD.model('calc').get('chsinglefam');
        var chcondo = RAD.model('calc').get('chcondo');
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
        var termitefee = config.termitefee;
        var btotal = config.btotal;
        var stotal = config.stotal;
        var note = config.note;
        var digidocs = config.digidocs;
        var totalpolicy = config.totalpolicy;
        var x = config.x;
        var y = config.y;
        var commper = 0;
        var commission = 0;
        var pud = 0;

        if (RAD.model('calc').get('moamount') == "") {
            moamount = 0;
        }
        else {
            moamount = RAD.model('calc').get('moamount');
        }
        if (RAD.model('calc').get('misccharge') == "") {
            misccharge = 0;
        }
        else {
            misccharge = RAD.model('calc').get('misccharge');
        }
        chsinglefam = RAD.model('calc').get('chsinglefam');
        chcondo = RAD.model('calc').get('chcondo');
        commper = 0;
        commission = 0;
        if (RAD.model('calc').get('commper') != "") {
            commper = RAD.model('calc').get('commper');
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
            condopud = 0;
            envend = 0;
        }
        else {
            if (RAD.model('calc').chcondo) {
                chcondo = 25;
                pud = 0;
            }
            else {
                chcondo = 0;
                pud = 25;
            }
            condopud = 25;
        }

        if (chsinglefam && (moamount > 0)) {
            surveyfee = 450;
            termitefee = 100;
        }
        else {
            surveyfee = 0;
            termitefee = 0;
        }

        settfee = 350;

        if (RAD.model('calc').get('commissionOwner')) {
            btotal += parseInt(commission);
        }
        else {
            stotal += parseInt(commission);
        }
        if (RAD.model('calc').get('miscfeeOwner')) {
            btotal += parseInt(misccharge);
        }
        else {
            stotal += parseInt(misccharge);
        }
        if (RAD.model('calc').get('settfeeOwner')) {
            btotal += parseInt(settfee);
        }
        else {
            stotal += parseInt(settfee);
        }
        if (RAD.model('calc').get('titleinsOwner')) {
            btotal += parseInt(titleins);
        }
        else {
            stotal += parseInt(titleins);
        }
        if (RAD.model('calc').get('tsearchOwner')) {
            btotal += parseInt(tsearch);
        }
        else {
            stotal += parseInt(tsearch);
        }
        if (RAD.model('calc').get('lenpolicyOwner')) {
            btotal += parseInt(lenpolicy);
        }
        else {
            stotal += parseInt(lenpolicy);
        }
        if (RAD.model('calc').get('condopudOwner')) {
            btotal += parseInt(condopud);
        }
        else {
            stotal += parseInt(condopud);
        }
        if (RAD.model('calc').get('envendOwner')) {
            btotal += parseInt(envend);
        }
        else {
            stotal += parseInt(envend);
        }
        if (RAD.model('calc').get('fform9Owner')) {
            btotal += parseInt(fform9);
        }
        else {
            stotal += parseInt(fform9);
        }
        if (RAD.model('calc').get('recordingOwner')) {
            btotal += parseInt(recording);
        }
        else {
            stotal += parseInt(recording);
        }
        if (RAD.model('calc').get('stampmortOwner')) {
            btotal += parseInt(stampmort);
        }
        else {
            stotal += parseInt(stampmort);
        }
        if (RAD.model('calc').get('inttaxOwner')) {
            btotal += parseInt(inttax);
        }
        else {
            stotal += parseInt(inttax);
        }
        if (RAD.model('calc').get('stampdeedOwner')) {
            btotal += parseInt(stampdeed);
        }
        else {
            stotal += parseInt(stampdeed);
        }
        if (RAD.model('calc').get('surveyfeeOwner')) {
            btotal += parseInt(surveyfee);
        }
        else {
            stotal += parseInt(surveyfee);
        }
        if (RAD.model('calc').get('termitefeeOwner')) {
            btotal += parseInt(termitefee);
        }
        else {
            stotal += parseInt(termitefee);
        }
        if (RAD.model('calc').get('digidocsOwner')) {
            btotal += parseInt(digidocs);
        }
        else {
            stotal += parseInt(digidocs);
        }
        RAD.model('calc').set({result: {
            commission: commission,
            misccharge: misccharge,
            settfee: settfee,
            titleins: titleins,
            tsearch: tsearch,
            lenpolicy: lenpolicy,
            condopud: condopud,
            envend: envend,
            fform9: fform9,
            recording: recording,
            stampmort: stampmort,
            inttax: inttax,
            stampdeed: stampdeed,
            surveyfee: surveyfee,
            termitefee: termitefee,
            digidocs: digidocs,
            btotal: btotal,
            stotal: stotal
        }
        })

    }
}));

RAD.calculation;




//function compute(form, options) {
//
//
//	var purprice = RAD.model('calc').get('purprice');
//	var moamount = 0;
//	var misccharge = 0;
//	var chsinglefam = true;
//	var chcondo = true;
//	var settfee = 350;
//	var titleins = 0;
//	var tsearch = 50;
//	var lenpolicy = 250;
//	var condopud = 0;
//	var envend = 25;
//	var fform9 = 0;
//	var recording = 0;
//	var stampmort = 0;
//	var inttax = 0;
//	var stampdeed = 0;
//	var surveyfee = 0;
//	var termitefee = 0;
//	var btotal = 0;
//	var stotal = 0;
//	var note = "";
//	var digidocs = 35;
//	var totalpolicy = 0;
//	var x = 0;
//	var y = 0;
//
//
//	if (RAD.model('calc').get('moamount') == "") {
//		moamount = 0;
//	}
//	else {
//		moamount = RAD.model('calc').get('moamount');
//	}
//	if (RAD.model('calc').get('misccharge') == "") {
//		misccharge = 0;
//	}
//	else {
//		misccharge = RAD.model('calc').get('misccharge');
//	}
//	chsinglefam = form.chsinglefam.checked;
//	chcondo = form.chcondo.checked;
//	commper = 0;
//	commission = 0;
//	if (form.commper.value != "") {
//		commper = form.commper.value;
//		commission = purprice * commper / 100;
//	}
//
//
//	// title insurance calculations
//	if (purprice < 100000) {
//		titleins = (purprice / 1000) * 5.75;
//	}
//	else if (purprice >= 100000 && purprice < 1000000) {
//		x = purprice - 100000;
//		y = (x / 1000) * 5;
//		titleins = y + 575;
//	}
//	else if (purprice >= 1000000 && purprice < 5000000) {
//		x = purprice - 1000000;
//		y = (x / 1000) * 2.5;
//		titleins = y + 5075;
//	}
//	else if (purprice >= 5000000 && purprice < 10000000) {
//		x = purprice - 5000000;
//		y = (x / 1000) * 2.25;
//		titleins = y + 15075;
//	}
//	else {
//		x = purprice - 10000000;
//		y = (x / 1000) * 2;
//		titleins = y + 26325;
//	}
//	//end of title insurance calculations
//
//	stampdeed = (purprice / 1000) * 7;
//	stampmort = (moamount / 1000) * 3.5;
//	inttax = (moamount / 1000) * 2;
//	//decide if there is need for lenders policy
//	if (moamount == 0) {
//		lenpolicy = 0;
//	}
//	else
//	{
//		lenpolicy = 250;
//		totalpolicy = titleins + lenpolicy;
//	}
//
//	//end of lenders policy section
//	//fla form 9 setcion
//	if (moamount == 0) {
//		fform9 = 0;
//	}
//	else {
//		fform9 = totalpolicy * 0.10;
//	}
//	//end fla form 9 setion
//
//	if (moamount == 0) {
//		recording = 27;
//	}
//	else {
//		recording = 207;
//	}
//
//	if (moamount == 0) {
//		condopud = 0;
//		envend = 0;
//	}
//	else {
//		if (form.chcondo.checked) {
//			chcondo = 25;
//			pud = 0;
//		}
//		else {
//			chcondo = 0;
//			pud = 25;
//		}
//		condopud = 25;
//	}
//
//	if (chsinglefam && (moamount > 0))
//	{
//		surveyfee = 450;
//		termitefee = 100;
//	}
//	else {
//		surveyfee = 0;
//		termitefee = 0;
//	}
//
//	settfee = 350;
//
//	if (form.commissionOwner[0].checked) {
//		hidden.hcommissionb.value = "Buyer";
//		btotal += parseInt(commission);
//	}
//	else {
//		hidden.hcommissionb.value = "Seller";
//		stotal += parseInt(commission);
//	}
//	if (form.miscfeeOwner[0].checked) {
//		btotal += parseInt(misccharge);
//		hidden.hmiscfeeb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(misccharge);
//		hidden.hmiscfeeb.value = "Seller";
//	}
//	if (form.settfeeOwner[0].checked) {
//		btotal += parseInt(settfee);
//		hidden.hsettfeeb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(settfee);
//		hidden.hsettfeeb.value = "Seller";
//	}
//	if (form.titleinsOwner[0].checked) {
//		btotal += parseInt(titleins);
//		hidden.htitleinsb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(titleins);
//		hidden.htitleinsb.value = "Seller";
//	}
//	if (form.tsearchOwner[0].checked) {
//		btotal += parseInt(tsearch);
//		hidden.htsearchb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(tsearch);
//		hidden.htsearchb.value = "Seller";
//	}
//	if (form.lenpolicyOwner[0].checked) {
//		btotal += parseInt(lenpolicy);
//		hidden.hlenpolicyb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(lenpolicy);
//		hidden.hlenpolicyb.value = "Seller";
//	}
//	if (form.condopudOwner[0].checked) {
//		btotal += parseInt(condopud);
//		hidden.hcondopudb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(condopud);
//		hidden.hcondopudb.value = "Seller";
//	}
//	if (form.envendOwner[0].checked) {
//		btotal += parseInt(envend);
//		hidden.henvendb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(envend);
//		hidden.henvendb.value = "Seller";
//	}
//	if (form.fform9Owner[0].checked) {
//		btotal += parseInt(fform9);
//		hidden.hfform9b.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(fform9);
//		hidden.hfform9b.value = "Seller";
//	}
//	if (form.recordingOwner[0].checked) {
//		btotal += parseInt(recording);
//		hidden.hrecordingb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(recording);
//		hidden.hrecordingb.value = "Seller";
//	}
//	if (form.stampmortOwner[0].checked) {
//		btotal += parseInt(stampmort);
//		hidden.hstampmortb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(stampmort);
//		hidden.hstampmortb.value = "Seller";
//	}
//	if (form.inttaxOwner[0].checked) {
//		btotal += parseInt(inttax);
//		hidden.hinttaxb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(inttax);
//		hidden.hinttaxb.value = "Seller";
//	}
//	if (form.stampdeedOwner[0].checked) {
//		btotal += parseInt(stampdeed);
//		hidden.hstampdeedb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(stampdeed);
//		hidden.hstampdeedb.value = "Seller";
//	}
//	if (form.surveyfeeOwner[0].checked) {
//		btotal += parseInt(surveyfee);
//		hidden.hsurveyfeeb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(surveyfee);
//		hidden.hsurveyfeeb.value = "Seller";
//	}
//	if (form.termitefeeOwner[0].checked) {
//		btotal += parseInt(termitefee);
//		hidden.htermitefeeb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(termitefee);
//		hidden.htermitefeeb.value = "Seller";
//	}
//	if (form.digidocsOwner[0].checked) {
//		btotal += parseInt(digidocs);
//		hidden.hdigidocsfeeb.value = "Buyer";
//	}
//	else {
//		stotal += parseInt(digidocs);
//		hidden.hdigidocsfeeb.value = "Seller";
//	}
//
//	form.commission.value = "$" + parseInt(commission);
//	form.miscfee.value = "$" + parseInt(misccharge);
//	form.settfee.value = "$" + parseInt(settfee);
//	form.titleins.value = "$" + parseInt(titleins);
//	form.tsearch.value = "$" + parseInt(tsearch);
//	form.lenpolicy.value = "$" + parseInt(lenpolicy);
//	form.condopud.value = "$" + parseInt(condopud);
//	form.envend.value = "$" + parseInt(envend);
//	form.fform9.value = "$" + parseInt(fform9);
//	form.recording.value = "$" + parseInt(recording);
//	form.stampmort.value = "$" + parseInt(stampmort);
//	form.inttax.value = "$" + parseInt(inttax);
//	form.stampdeed.value = "$" + parseInt(stampdeed);
//	form.surveyfee.value = "$" + parseInt(surveyfee);
//	form.termitefee.value = "$" + parseInt(termitefee);
//	form.digidocsfee.value = "$" + parseInt(digidocs);
//	form.btotal.value = "$" + parseInt(btotal);
//	form.stotal.value = "$" + parseInt(stotal);
//
//	if (moamount > purprice)
//		note = "NOTE: Loan policy exceeds sale price - Please contact title company for correct policy amount.";
//
//	form.note.value = note;
//
//	if (form.chcondo.checked) {
//		chkcondo = "Yes";
//	}
//	else {
//		chkcondo = "No";
//	}
//	if (form.chsinglefam.checked) {
//		chksinglefam = "Yes";
//	}
//	else {
//		chksinglefam = "No";
//	}
//
//	hidden.hpurprice.value = "$" + parseInt(purprice);
//	hidden.hmoamount.value = "$" + parseInt(moamount);
//	hidden.hmisccharge.value = "$" + parseInt(misccharge);
//	hidden.hchcondo.value = chkcondo;
//	hidden.hchsinglefam.value = chksinglefam;
//	hidden.hcommper.value = parseFloat(commper);
//	hidden.hcommission.value = "$" + parseInt(commission);
//	hidden.hmiscfee.value = "$" + parseInt(misccharge);
//	hidden.hsettfee.value = "$" + parseInt(settfee);
//	hidden.htitleins.value = "$" + parseInt(titleins);
//	hidden.htsearch.value = "$" + parseInt(tsearch);
//	hidden.hlenpolicy.value = "$" + parseInt(lenpolicy);
//	hidden.hcondopud.value = "$" + parseInt(condopud);
//	hidden.henvend.value = "$" + parseInt(envend);
//	hidden.hfform9.value = "$" + parseInt(fform9);
//	hidden.hrecording.value = "$" + parseInt(recording);
//	hidden.hstampmort.value = "$" + parseInt(stampmort);
//	hidden.hinttax.value = "$" + parseInt(inttax);
//	hidden.hstampdeed.value = "$" + parseInt(stampdeed);
//	hidden.hsurveyfee.value = "$" + parseInt(surveyfee);
//	hidden.htermitefee.value = "$" + parseInt(termitefee);
//	hidden.hdigidocsfee.value = "$" + parseInt(digidocs);
//	hidden.hbtotal.value = "$" + parseInt(btotal);
//	hidden.hstotal.value = "$" + parseInt(stotal);
//
//	hidden.hnote.value = note;
//}
//
//function clearform(form) {
//	form.purprice.value = "";
//	form.moamount.value = "";
//	form.misccharge.value = "";
//
//	form.commission.value = "";
//	form.miscfee.value = "";
//	form.settfee.value = "";
//	form.titleins.value = "";
//	form.tsearch.value = "";
//	form.lenpolicy.value = "";
//	form.condopud.value = "";
//	form.envend.value = "";
//	form.fform9.value = "";
//	form.recording.value = "";
//	form.stampmort.value = "";
//	form.inttax.value = "";
//	form.stampdeed.value = "";
//	form.surveyfee.value = "";
//	form.termitefee.value = "";
//	form.digidocsfee.value = "";
//	form.btotal.value = "";
//	form.stotal.value = "";
//	form.note.value = "";
//}
//
