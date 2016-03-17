/*global framer*/

import loginTemplate from './loginTemplate.html';

var loginName = 'login';
var sharedLocalStorageName = 'appData';

framer
	.module(loginName, [])
	.storage(sharedLocalStorageName, function(){
		this.create(sharedLocalStorageName, loginName, 'some data')
	})
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'yellow';
			view.mainElement.innerHTML = loginTemplate;
		}
	})
	.controller('mainController', function(moduleInstance) {
		// console.log('moduleInstance.model.get', moduleInstance.model.get)
		// moduleInstance.model.get('login/').then((response) => {
		// 	console.log('response', response)
		// });//
		this.init = init;
		framer.events.subscribe('pubsub', function(dataFromPublishing) {
			moduleInstance.model.create(dataFromPublishing);
		});

		function init(){
			moduleInstance.view.init()
		}
	});

export default loginName;