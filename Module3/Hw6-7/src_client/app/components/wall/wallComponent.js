/*global framer*/

import addPostTemplate from './addPostTemplate.handlebars';
import postsTemplate from './postsTemplate.handlebars';
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
			view.$addPost = document.querySelector('[data-id=addPost]');
			view.$posts = document.querySelector('[data-id=posts]');
			// view.mainElement.style.backgroundColor = 'red';
			// view.mainElement.innerHTML = '';
			// get initial posts state
			moduleInstance.model.get('post/').then((response) => {
				console.log('response', response);
				let parsedResponse = JSON.parse(response);

				view.$addPost.innerHTML = addPostTemplate(parsedResponse);
				view.$posts.innerHTML = postsTemplate(parsedResponse);
				view.filter = document.querySelector('[data-wall=filter]');
				if (view.filter) {
					// let checked = view.filter.checked;
					view.filter.onclick = function(event) {
						console.log('view.filter.checked', view.filter.checked);

						if (view.filter.checked === true) {
							// checked = view.filter.checked;
							moduleInstance.model.get('post/' + parsedResponse.username).then((response) => {
								let parsedResponseInner = JSON.parse(response);
								view.$posts.innerHTML = postsTemplate(parsedResponseInner);

							});
							console.log('event.target.checked', event.target.checked);
						} else {
							moduleInstance.model.get('post/').then((response) => {
								let parsedResponseInner = JSON.parse(response);
								view.$posts.innerHTML = postsTemplate(parsedResponseInner);
							});
						}						
					}
				}

			});

			
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