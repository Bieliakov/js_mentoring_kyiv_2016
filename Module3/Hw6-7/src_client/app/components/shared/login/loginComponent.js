/*global framer*/

import loginTemplate from './loginTemplate.html';

var loginName = 'login';

framer
	.module(loginName, [])
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.innerHTML = loginTemplate;
		}
	})
	.controller('mainController', function(moduleInstance) {
		this.init = init;
		function init(){
			moduleInstance.view.init()
		}
	});

export default loginName;