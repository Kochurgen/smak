RAD.model('shoppingCart', Backbone.Collection.extend({
	model:new RAD.model('item')
}));

RAD.view('view.router', RAD.Blanks.View.extend({
	url: 'view/router/router.html',
	children: [
		{
			container_id: '#content',
			content: 'view.main',
			animation: 'none'
		}
	],
	events: {
		'tap #back': 'tapBack',
		'tap #logout': 'tapLogout',
		'tap #shopping-cart': 'goToCart',
		'tap #contact': 'tapContent'
	},
	sendView: '',
	controls: {
		'.back': [
			'view.contacts',
			'view.item_info'

		],
		'.header-title-contact': [
			'view.contacts'
		],
		'.header-title-main': [
			'view.main',
			'view.item_info'
		],
		'.header-title-result': [
			'view.results'
		],
		'.header-item-right': [
			'view.main',
			'view.results',
			'view.item_info'
		]
	},
	model:new RAD.model('shoppingCart'),
	// model: new Backbone.Model.extend(),
	onInitialize: function () {

		this.subscribe('navigation.show', this.onChangeHeader, this);
		this.subscribe('navigation.back', this.onChangeHeader, this);
	},
	onStartAttach: function () {
		
	},
	onDestroy: function () {
		this.subscribe('navigation.show', this.onChangeHeader, this);
		this.subscribe('navigation.back', this.onChangeHeader, this);
	},
	setMainHeader: function () {
		this.onChangeHeader('navigation.show', {content: 'view.main'});
	},
	onChangeHeader: function (msg, data) {
		//if (this.application) {
		//	this.application.keyboardHide();
		//}
		var viewID = data && data.content ? data.content : '',
			that=this;
		_(this.controls).each(function (item, index) {
			this.$(index).hide();
			if (item.indexOf(viewID) > -1) {
				this.$(index).show();
			}
		});
	},
	onReceiveMsg: function (msg, data) {
		var action = msg.split('.').pop();
		if (_.isFunction(this[action])) {
			this[action](data);
		}
	},
	goToContacts: function (params) {
		var options = {
			container_id: '#content',
			content: 'view.contacts',
			extras: params
		};
		_.extend(options, params);
		this.publish('navigation.show', options);

	},
	goToMain: function (params) {
		var options = {
			container_id: '#content',
			content: 'view.main'

		};
		_.extend(options, params);
		this.publish('navigation.show', options);

	},
	goToResult: function (params){
		var options = {
			container_id: '#content',
			content: 'view.item_info',
		};
		_.extend(options, params);
		this.publish('navigation.show', options);
	},
	backTo: function (params) {
		var options = {
			container_id: '#content',
			content: 'view.main',
			backstack: false
		};
		_.extend(options, params);
		this.publish('navigation.back', options);
	},
	tapContent: function () {
		var viewID = $('#content').attr('view');
		if (RAD.core.getView(viewID) && _.isFunction(RAD.core.getView(viewID)['goToContact'])) {
				setTimeout(function () {
					RAD.core.getView(viewID).goToContact();
				}, 500);

		}
	},
	tapBack: function () {
		var viewID = $('#content').attr('view');
		if (RAD.core.getView(viewID) && _.isFunction(RAD.core.getView(viewID)['goBack'])) {
				setTimeout(function () {
					RAD.core.getView(viewID).goBack();
				}, 500);

		}
	},
	openInfo: function (params) {
		var options = {
			container_id: '#content',
			content: 'view.open_info',
		};
		_.extend(options, params);
		console.log(options, params);
		this.publish('navigation.show', options);
	},
	goToShopCart: function (params) {
		var that = this;
		console.log(that.model);
		that.model.reset(params.extras.data);
		var data = that.model.toJSON();
		var options = {
			container_id: '#content',
			content: 'view.shopping_cart',
			extras: {
				data: data
			}
		};
		// _.extend(options, params);
		this.publish('navigation.show', options);
	}

}));
