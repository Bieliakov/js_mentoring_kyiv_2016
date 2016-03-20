/*global framer*/

import signupTemplate from './signupTemplate.html';

var signupName = 'signup';
var sharedLocalStorageName = 'appData';

framer
	.module(signupName, [])
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.innerHTML = signupTemplate;
		}
	})
	.controller('mainController', function(moduleInstance) {

		this.init = init;

		function init(){
			moduleInstance.view.init()
		}
	});

export default signupName;