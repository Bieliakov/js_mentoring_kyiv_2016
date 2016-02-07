var framer = (function framerIIFE(global){

	var router = (function routerFunc(global) {

		var routes = {};

		global.addEventListener('hashchange', hashChangeHandler);
		global.addEventListener('load', hashChangeHandler);

		function route(path /* moduleNames */){
			var moduleNamesArray = Array.prototype.slice.call(arguments, 1);
			routes[path] = { moduleNames: moduleNamesArray };
			return router;
		}

		function hashChangeHandler(event) {
			event.preventDefault();
			
			var hashLessURL = location.hash.slice(1) || '/';
			var hashLessURLArray = hashLessURL.split('/');
			var routeName = hashLessURLArray[0] || '/';
			var routeElements = routes[routeName];

			routeElements.moduleNames.forEach(function(moduleName){
				var module = framer.module(moduleName);
				var moduleController = module.controller;
				if (typeof moduleController.init === 'function') {
					moduleController.init();
				} else {
					throw new Error('Please, define init function in contoller of ' + moduleName + '!');
				}
			});
		}

		return {
			route: route
		}

	})(global);

	var allModules = {};

	function module (name, dependencies) {

		if (dependencies && allModules[name]) {
			throw new Error(name + ' module is already registered!');
		} else if (dependencies) {
			return createModule(name, dependencies);
		} else {
			return getModule(name);
		}

		function createModule (name, dependencies) {

			var moduleInstance = {
				name: name,
				dependencies: dependencies,
				controller: Controller,
				view: View,
				model: Model,
				storage: Storage
			};

			function Controller(controllerName, controllerFuncCallback) {
				moduleInstance.controller = new controllerFuncCallback(moduleInstance);
				return moduleInstance;
			}

			function View(viewName, viewFuncCallback) {
				viewFuncCallback.prototype = Object.create(viewFunctionality);
				moduleInstance.view = new viewFuncCallback(global);
				return moduleInstance;
			}

			var viewFunctionality = {
				bind: global.addEventListener
			}

			function Model(modelName, modelFuncCallback) {
				modelFuncCallback.prototype = Object.create(modelFunctionality);
				moduleInstance.model = new modelFuncCallback(global);
				return moduleInstance;
			}

			var modelFunctionality = {
				create: function(data){
					moduleInstance.storage.create(moduleInstance.storage.storageName, Date.now(), data)
				},
				get: function(){
					moduleInstance.storage.get(moduleInstance.storage.storageName);
				}
			}

			function Storage(storageName, storageFuncCallback) {

				if (!localStorage[storageName]) {
					global.localStorage[storageName] = JSON.stringify({});
				}

				storageFuncCallback.prototype = Object.create(storageFunctionality);
				storageFuncCallback.prototype.storageName = storageName;
				
				moduleInstance.storage = new storageFuncCallback(moduleInstance);
				return moduleInstance;
			}

			var storageFunctionality = {
				get: function(storageName) {
					return JSON.parse(global.localStorage[storageName]);
				},
				create: function(storageName, newFieldName, newFieldData) {
					var storage = JSON.parse(global.localStorage[storageName]);
					storage[newFieldName] = newFieldData;
					global.localStorage[storageName] = JSON.stringify(storage);
					return storage;
				}
			};

			allModules[name] = moduleInstance;
			return moduleInstance;
		};

		function getModule (name) {
			if (allModules.hasOwnProperty(name)) {
				return allModules[name];
			} else {
				throw 'Module '+ name + ' does not exist!';
			}
		};
	}

	var events = {

		subscribers: {
			'pubsub': [], // event type: 'pubsub'
		},

		subscribe: function (type, callback) {
			type = type || 'pubsub';
			if (typeof this.subscribers[type] === 'undefined') {
				this.subscribers[type] = [];
			}
			this.subscribers[type].push(callback);
		},

		publish: function(type, someDataForPublishing){
			this.visitSubscribers('publish', type, someDataForPublishing);
		},

		visitSubscribers: function (action, type, arg) {
			var pubtype = type || 'pubsub';
			var subscribers = this.subscribers[pubtype];
			var i;
			var subscribersLength = subscribers.length;

			for (var i = 0; i < subscribersLength; i++) {
				if (action === 'publish') {
					subscribers[i](arg);
				} else if (subscribers[i] === arg) {
					subscribers.splice(i, 1);
				}
			}
		}
	}
	
	return {
		module: module,
		router: router,
		events: events
	}

})(window);

window.framer = framer;
