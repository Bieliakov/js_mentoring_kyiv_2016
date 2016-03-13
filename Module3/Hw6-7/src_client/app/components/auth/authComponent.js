/*global framer*/

import authTemplate from './authTemplate.handlebars';

var authName = 'auth';
var sharedLocalStorageName = 'appData';

framer
	.module(authName, [])
	.storage(sharedLocalStorageName, function(){
		this.create(sharedLocalStorageName, authName, 'some data')
	})
	.model('mainModel', function() {

	})
	.view('mainView', function(moduleInstance){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.querySelector('[data-id=auth]');
			view.mainElement.style.backgroundColor = 'yellow';
			moduleInstance.model.get('login/').then((user) => {
				var parsedUser = JSON.parse(user);
				view.mainElement.innerHTML = authTemplate(parsedUser);
				console.log('response here', parsedUser)

			});//
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

export default authName;