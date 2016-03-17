/*global framer*/

import signupTemplate from './signupTemplate.html';

var signupName = 'signup';
var sharedLocalStorageName = 'appData';

framer
	.module(signupName, [])
	.storage(sharedLocalStorageName, function(){
		this.create(sharedLocalStorageName, signupName, 'some data')
	})
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'yellow';
			view.mainElement.innerHTML = signupTemplate;
		}
	})
	.controller('mainController', function(moduleInstance) {
		// console.log('moduleInstance.model.get', moduleInstance.model.get)
		moduleInstance.model.get('signup/').then((response) => {
			console.log('response', response)
		});//
		this.init = init;
		framer.events.subscribe('pubsub', function(dataFromPublishing) {
			moduleInstance.model.create(dataFromPublishing);
		});

		function init(){
			moduleInstance.view.init()
		}
	});

export default signupName;