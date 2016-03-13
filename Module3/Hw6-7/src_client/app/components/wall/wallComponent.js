/*global framer*/

import wallTemplate from './wallTemplate.handlebars';

var wallName = 'wall';

framer
	.module(wallName, [])
	.model('mainModel', function() {

	})
	.view('someCoolView', function(moduleInstance){
		var view = this;
		view.init = init;
		function init() {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'red';

			moduleInstance.model.get('post/').then((response) => {
				console.log('response', response);
				let parsedResponse = JSON.parse(response);
				view.mainElement.innerHTML = wallTemplate(parsedResponse);
				// {
				// username: 'username',
				// posts: [{
				// 	title: 'title',
				// 	body: 'body'
				// }]}
			});//

			
		}
	})
	.controller('thirdController', function(moduleInstance) {
		
		var ctrl = this;

		ctrl.init = init;

		function init () {
			moduleInstance.view.init();
		}
	});

export default wallName;