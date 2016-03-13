/*global framer*/

import wallTemplate from './wallTemplate.handlebars';

var wallName = 'wall';

framer
	.module(wallName, [])
	.model('mainModel', function() {

	})
	.view('someCoolView', function(){
		var view = this;
		view.init = init;
		function init() {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'red';

			view.mainElement.innerHTML = wallTemplate({
				username: 'username',
				posts: [{
					title: 'title',
					body: 'body'
				}]
			});
		}
	})
	.controller('thirdController', function(moduleInstance) {
		moduleInstance.model.get('post/').then((response) => {
			console.log('response', response)
		});//
		var ctrl = this;

		ctrl.init = init;

		function init () {
			moduleInstance.view.init();
		}
	});

export default wallName;