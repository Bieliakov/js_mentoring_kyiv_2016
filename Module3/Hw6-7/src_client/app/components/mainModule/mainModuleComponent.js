/*global framer*/

import mainModuleTemplate from './mainModuleTemplate.html';

var mainModuleName = 'mainModule';
var sharedLocalStorageName = 'appData';

framer
	.module(mainModuleName, [])
	.storage(sharedLocalStorageName, function(){
		this.create(sharedLocalStorageName, mainModuleName, 'some data')
	})
	.model('mainModel', function() {

	})
	.view('mainView', function(){
		var view = this;
		view.init = init;

		function init () {
			view.mainElement = document.getElementById('main');
			view.mainElement.style.backgroundColor = 'yellow';
			view.mainElement.innerHTML = mainModuleTemplate;
		}
	})
	.controller('mainController', function(moduleInstance) {
		// console.log('moduleInstance.model.get', moduleInstance.model.get)
		moduleInstance.model.get('').then((response) => {
			console.log('response', response)
		});//
		this.init = init;
		framer.events.subscribe('pubsub', function(dataFromPublishing) {
			moduleInstance.model.create(dataFromPublishing);
		});

		function init(){
			moduleInstance.view.init()
		}
	});

export default mainModuleName;