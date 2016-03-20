/*global framer*/

import profileTemplate from './profileTemplate.html';
import service from '../services/index.js';
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

			// view.mainElement.onsubmit = function(event) {
			// 	console.log('in submit event')
			// 	event.preventDefault();
			// 	let element = event.target;
			// 	let submitAction = element.getAttribute('data-action');
				
			// 	if(submitAction === 'updateAvatar') {
			// 		console.log('update Avatar')
			// 		let username = service.currentUser.getUser();
			// 		console.log('username', username)
			// 		let avatarNode = document.querySelector('[data-profile="avatar"]');

			// 		if (!avatarNode.value) {
			// 			let message = document.createElement('div');
			// 			message.innerHTML = 'please, add an image';
			// 			element.appendChild(message);
			// 			window.setTimeout(function(){
			// 				element.removeChild(message);
			// 			}, 3000);
			// 			return false;
			// 		}

			// 		element.submit();

			// 		// moduleInstance.model.put('user/' + username, avatarNode);
			// 	}				
			// }
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