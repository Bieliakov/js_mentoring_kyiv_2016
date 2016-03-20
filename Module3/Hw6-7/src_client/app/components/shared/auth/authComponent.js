/*global framer*/

import authTemplate from './authTemplate.handlebars';

var authName = 'auth';

framer
	.module(authName, [])
	.model('mainModel', function() {

	})
	.view('mainView', function(moduleInstance){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.querySelector('[data-id=auth]');
			moduleInstance.model.get('login/').then((user) => {
				var parsedUser = JSON.parse(user);
				view.mainElement.innerHTML = authTemplate(parsedUser);
			});
		}
	})
	.controller('mainController', function(moduleInstance) {

		this.init = init;
		function init(){
			moduleInstance.view.init()
		}
	});

export default authName;