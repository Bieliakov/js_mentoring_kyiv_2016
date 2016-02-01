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
				view.mainElement.style.backgroundColor = 'yellow';
				view.template = '<div>mainController data</div>';
				view.mainElement.innerHTML = view.template;
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
				view.mainElement.style.backgroundColor = 'green';
				view.template = '<div>Share next text with mainModule</div>' +
					'<input id="coolInput"></input>' +
					'<button id="coolButton">coolButton</button>';

				view.mainElement.innerHTML = view.template;

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

	var thirdModuleName = 'thirdModule';

	framer
		.module(thirdModuleName, [])
		.view('someCoolView', function(global){
			var view = this;
			view.init = init;
			function init() {
				view.mainElement = document.getElementById('main');
				view.mainElement.style.backgroundColor = 'red';
				view.template = '<div>hello, this is third view template!</div>';
				view.mainElement.innerHTML = view.template;
			}
			
		})
		.controller('thirdController', function(moduleInstance) {
			var ctrl = this;

			ctrl.init = init;

			function init () {
				moduleInstance.view.init();
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
	
	// for testing purposes: if module is already created
	// framer.module(sharedModuleName, []);

	framer.router.route('/', mainModuleName, sharedModuleName);

	framer.router.route('somecooltab', someCoolModuleName, sharedModuleName);

	framer.router.route('thirdtab', thirdModuleName, sharedModuleName);
	
})(window, framer);
