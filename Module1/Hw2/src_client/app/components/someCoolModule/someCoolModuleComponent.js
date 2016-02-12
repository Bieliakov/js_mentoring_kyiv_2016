import someCoolModuleTemplate from './someCoolModuleTemplate.html';

var someCoolModuleName = 'someCoolModule';

framer
	.module(someCoolModuleName, [])
	.view('someCoolView', function(global){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'green';

			view.mainElement.innerHTML = someCoolModuleTemplate;

			var coolInput = document.getElementById('coolInput');
			var coolButton = document.getElementById('coolButton');

			var divWithSavedText = document.createElement('div');
			divWithSavedText.innerHTML = 'The input is published and saved to localStorage!';

			coolButton.addEventListener('click', function(event) {
				var currentCollInputValue = coolInput.value;
				if (!currentCollInputValue) return;
				framer.events.publish('pubsub', currentCollInputValue);
				coolInput.value = '';
				view.mainElement.appendChild(divWithSavedText);
				global.setTimeout(function(){
					view.mainElement.removeChild(divWithSavedText);
				}, 2000);

			});
		}
	})
	.controller('someCoolController', function(currentModule) {
		var ctrl = this;
		ctrl.init = init;

		function init(){
			currentModule.view.init();
		}
	});

export default someCoolModuleName;