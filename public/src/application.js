RAD.application(function (core) {
	'use strict';

	var app = this;

	/**
	 * Shows application alert with button
	 * @param {String}    message       - Message
	 * @param {Function=} alertCallback - Callback on alert close
	 * @param {String=}   title         - Title for massage (Warning, Info etc.)
	 * @param {String}    buttonName    - Name of button to close
	 */
	app.alert = function (message, alertCallback, title, buttonName) {
		if (window.isBrowser) {
			alert(message);
			if (_.isFunction(alertCallback)) {
				alertCallback();
			}
		} else {
			navigator['notification'].alert(message, alertCallback, title, buttonName);
		}
	};
	app.ondeviceready = function () {
		//navigator.splashscreen.show();
		document.addEventListener('showkeyboard', app.showKeyboard, false);
		document.addEventListener('hidekeyboard', app.hideKeyboard, false);
		document.addEventListener('backbutton', app.backbutton, false);
		var options = {
			container_id: '#screen',
			content: "view.router",
			animation: 'none'
		};
		core.publish('navigation.show', options);
	};
	app.backbutton = function () {
		"use strict";

		var $back = $('#back');
		if ($back.get(0)) {
			$back.trigger('tap');
		}
	};
	app.start = function () {
		if (window.isBrowser) {
			this.ondeviceready();
		} else {
			document.addEventListener("deviceready", this.ondeviceready.bind(app), false);
		}

	};
	app.isOnline = function () {
		return _isOnline;
	};

	app.setOnlineStatus = function () {
		_isOnline = true;
	};

	app.setOfflineStatus = function () {
		_isOnline = false;
		core.publish('view.search_page.showError');
	};
	app.showPreloader = function () {
		var options = {
			content: "view.popup_spin",
			target: document.getElementById('screen'),
//            height: 100,
//            width: 100,
			gravity: 'right'
		};

		RAD.core.publish('navigation.dialog.show', options);
	};

	app.back = function () {
		history.back();
		var $back = $('#back');
		if ($back.get(0)) {
			$back.trigger('tap');
		} else if (_.has(navigator, 'app') && _.isFunction(navigator['app']['exitApp'])) {
			navigator['app']['exitApp']();
		} else {
//			this.publish('router.back', null);
		}
	};

	app.onShowKeyboard = function () {
		app.onShowKeyboardEvent();
	};

	app.showKeyboard = function () {
		app.onShowKeyboardEvent('show');
		RAD.core.getView('view.main').onKeyboardShow();
	};

	app.hideKeyboard = function () {
		app.onShowKeyboardEvent('hide');
		RAD.core.getView('view.main').onKeyboardHide();
	};

	app.onShowKeyboardEvent = function (event) {
	};
	app.addComa = function(elem) {
			var tgt = elem.toString(),
				//val = parseInt(tgt),
				amt = Math.ceil(tgt.length/3), newStr = '', x = 0;

			while ( x <= amt ) {
					newStr += tgt.slice(x * 3, (x + 1) * 3);
					newStr += ( x < amt - 1 ) ? ',' : '';
					x++
			}
			return newStr;

	};

	return app;
}, true);

