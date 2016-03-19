/*global framer*/

import profileTemplate from './profileTemplate.html';

var profileName = 'profile';

framer
	.module(profileName, [])
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.innerHTML = profileTemplate;

			view.mainElement.onsubmit = function(event) {
				console.log('in submit event')
				event.preventDefault();
				let element = event.target;
				let submitAction = element.getAttribute('data-action');
				
				if(submitAction === 'updateAvatar') {
					console.log('update Avatar')
					let username = wallService.currentUser.getUser();
					let avatarNode = document.querySelector('[data-profile="avatar"]');

					

					// moduleInstance.model.put('post/' + postId, formData);
				}				
			}
		}
	})
	.controller('profileController', function(moduleInstance) {
		// console.log('moduleInstance.model.get', moduleInstance.model.get)
		// moduleInstance.model.get('profile/').then((response) => {
		// 	console.log('response', response)
		// });//
		this.init = init;
		// framer.events.subscribe('pubsub', function(dataFromPublishing) {
		// 	moduleInstance.model.create(dataFromPublishing);
		// });

		function init(){
			moduleInstance.view.init()
		}
	});

export default profileName;