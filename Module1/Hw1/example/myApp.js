(function(global, framer) {

	var mainModuleName = 'mainModule';
	var sharedLocalStorageName = 'appData';

	framer
		.module(mainModuleName, [])
		.storage(sharedLocalStorageName, function(){
			this.create(sharedLocalStorageName, mainModuleName, 'some data')
		})
		.model('mainModel', function() {

		})
		.view('mainView', function(global){
			var view = this;
			view.init = init;

			function init () {
				view.mainElement = document.getElementById('main');
				view.mainElement.innerHTML = '';
				var div = document.createElement('div');
				div.innerHTML = 'mainController data';
				view.mainElement.appendChild(div);
			}
		})
		.controller('mainController', function(moduleInstance) {
			this.init = init;
			framer.events.subscribe('pubsub', function(dataFromPublishing) {
				moduleInstance.model.create(dataFromPublishing);
			});

			function init(){
				moduleInstance.view.init()
			}
		});

	var someCoolModuleName = 'someCoolModule';

	framer
		.module(someCoolModuleName, [])
		.view('someCoolView', function(global){
			var view = this;
			view.init = init;

			function init () {
				view.mainElement = document.getElementById('main');
				view.mainElement.innerHTML = '';

				var documentFragment = document.createDocumentFragment();
				var divWithText = document.createElement('div');
				divWithText.innerHTML = 'Share next text with mainModule';

				documentFragment.appendChild(divWithText);

				var coolInput = document.createElement('input');
				coolInput.setAttribute('data-input', 'coolInput');

				documentFragment.appendChild(coolInput);
				view.mainElement.appendChild(documentFragment);
				
				coolInput.addEventListener('input', function(event) {
					framer.events.publish('pubsub', event.target.value);
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

	var sharedModuleName = 'sharedModule';

	framer
		.module(sharedModuleName, [])
		.controller('sharedController', function() {
			var ctrl = this;
			ctrl.init = init;

			function init(){
				ctrl.element = document.getElementById('shared');
				ctrl.element.innerHTML = '<div>Some init shared dataController data</div>';
			}
		});

	framer.router.route('/', mainModuleName, sharedModuleName);

	framer.router.route('somecooltab', someCoolModuleName, sharedModuleName);
	
})(window, framer);
