(function(global, framer) {
	console.log('framer', framer)
	
	var mainModuleName = 'mainModule';
	var sharedLocalStorageName = 'appData';

	framer
		.module(mainModuleName, [])
		.storage(sharedLocalStorageName, function(){
			console.log('this', this)
			this.extend(sharedLocalStorageName, mainModuleName, 'some data')
		})
		.view('mainView', function(global){

			this.mainElement = document.getElementById('main');
			this.mainElement.innerHTML = '<div>mainController data</div>';

		})
		.controller('mainController', function(moduleInstance) {
			console.log('moduleInstance in mainController', moduleInstance);
			this.init = init;
			framer.events.subscribe('pubsub', function(dataFromPublishing) {
				console.log('moduleInstance in subscribe', moduleInstance)
				moduleInstance.storage.extend(sharedLocalStorageName, mainModuleName, dataFromPublishing);
			});

			function init(){
				// moduleInstance.view.bind()
			}
			
		});

	var someCoolModuleName = 'someCoolModule';

	framer
		.module(someCoolModuleName, [])
		.controller('someCoolController', function(currentModule) {
			var ctrl = this;
			ctrl.init = init;
			// ctrl.buttonWithText = document.querySelector('[]');
			// ctrl.coolInput = document.querySelector('[data-input=coolInput]');
			console.log('currentModule in someCoolModuleName', currentModule);

			function init(){
				var mainElement = document.getElementById('main');
				var documentFragment = document.createDocumentFragment();

				var divWithText = document.createElement('div');
				divWithText.innerHTML = 'Share next text with mainModule';

				documentFragment.appendChild(divWithText);

				var coolInput = document.createElement('input');
				coolInput.setAttribute('data-input', 'coolInput');

				documentFragment.appendChild(coolInput);
				console.log('documentFragment', documentFragment)
				mainElement.appendChild(documentFragment);
				
				coolInput.addEventListener('input', function(event) {
					console.log('in input event from someCoolController');
					framer.events.publish('pubsub', event.target.value);
				});

				console.log('coolInput', coolInput)
	            
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
