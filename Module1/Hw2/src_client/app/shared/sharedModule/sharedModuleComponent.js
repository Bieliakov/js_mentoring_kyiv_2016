import sharedModuleTemplate from './sharedModuleTemplate.html';

var sharedModuleName = 'sharedModule';

framer
	.module(sharedModuleName, [])
	.view('sharedView', function() {
		var view = this;
		view.init = init;
		function init() {
			view.element = document.getElementById('shared');
			view.element.innerHTML = sharedModuleTemplate;
		}
	})
	.controller('sharedController', function(moduleInstance) {
		var ctrl = this;
		ctrl.init = init;

		function init(){
			moduleInstance.view.init();
		}
	});

export default sharedModuleName;