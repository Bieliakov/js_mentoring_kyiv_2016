/*global framer*/

import profileTemplate from './profileTemplate.html';
const profileName = 'profile';

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
				event.preventDefault();
				let element = event.target;
				let submitAction = element.getAttribute('data-action');
				
				if(submitAction === 'updateAvatar') {
					 let avatarNode = document.querySelector('[data-profile="avatar"]');
					 if (!avatarNode.value) {
                        let message = document.createElement('div');
                        message.innerHTML = 'please, add an image';
                        element.appendChild(message);
                        window.setTimeout(function(){
                            element.removeChild(message);
                        }, 3000);
                        return false;
					 }
					element.submit();
				}				
			}
		}
	})
	.controller('profileController', function(moduleInstance) {
		this.init = init;
		function init(){
			moduleInstance.view.init()
		}
	});

export default profileName;
