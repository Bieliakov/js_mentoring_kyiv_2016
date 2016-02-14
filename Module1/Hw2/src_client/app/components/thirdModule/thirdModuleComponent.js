/*global framer*/

import thirdModuleTemplate from './thirdModuleTemplate.html';

var thirdModuleName = 'thirdModule';

framer
	.module(thirdModuleName, [])
	.view('someCoolView', function(){
		var view = this;
		view.init = init;
		function init() {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'red';

			view.mainElement.innerHTML = thirdModuleTemplate;
		}
	})
	.controller('thirdController', function(moduleInstance) {
		var ctrl = this;

		ctrl.init = init;

		function init () {
			moduleInstance.view.init();
		}
	});

export default thirdModuleName;