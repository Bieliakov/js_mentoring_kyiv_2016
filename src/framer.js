var framer = (function framerIIFE(global){

	var router = (function routerFunc(global) {

		var routes = {};

		global.addEventListener('hashchange', hashChangeHandler);

		function route(path /* moduleNames */){
			var moduleNamesArray = Array.prototype.slice.call(arguments, 1);
			console.log(moduleNamesArray)
			routes[path] = { moduleNames: moduleNamesArray };
		}

		function hashChangeHandler(event) {
			event.preventDefault();
			
			var hashLessURL = location.hash.slice(1) || '/';
			console.log('hashLessURL', hashLessURL);
			var hashLessURLArray = hashLessURL.split('/');
			var routeName = hashLessURLArray[0] || '/';
			// console.log(routeName,'route name');
			// console.log('routes', routes);
			// console.log("routes['/']", routes['/'])
			var routeElements = routes[routeName];


			routeElements.moduleNames.forEach(function(moduleName){
				var module = framer.module(moduleName);
				var moduleController = module.controller;
				console.log('moduleController', moduleController)
				moduleController.init();

				// routeController.init(searchParams);
			});
		}

		return {
			route: route
		}

	})(global);

	var allModules = {};



	function module (name, dependencies) {

		if (dependencies) {
			return createModule(name, dependencies, allModules);
		} else {
			return getModule(name, allModules);
		}

		function createModule (name, dependencies, allModules) {

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
				moduleInstance.model = new modelFuncCallback(global);
				return moduleInstance;
			}

			function Storage(storageName, storageFuncCallback) {

				if (!localStorage[storageName]) {
					global.localStorage[storageName] = JSON.stringify({});
					console.log('global.localStorage[storageName]', global.localStorage[storageName])
				}

				storageFuncCallback.prototype = Object.create(storageFunctionality);
				storageFuncCallback.prototype.storageName = storageName;
				
				moduleInstance.storage = new storageFuncCallback(moduleInstance);
				
				return moduleInstance;
			}

			var storageFunctionality = {
				read: function(storageName) {
					return JSON.parse(global.localStorage[storageName]);
				},
				extend: function(storageName, newFieldName, newFieldData) {
					// console.log('storageName', storageName)
					// console.log('global.localStorage[storageName]', global.localStorage[storageName]);
					// console.log('JSON.parse(global.localStorage[storageName]', JSON.parse(global.localStorage[storageName]))
					var storage = JSON.parse(global.localStorage[storageName]);
					storage[newFieldName] = newFieldData;
					global.localStorage[storageName] = JSON.stringify(storage);
					return storage;
				}
				
			};

			allModules[name] = moduleInstance;
			return moduleInstance;
		};

		function getModule (name, allModules) {
			if (allModules.hasOwnProperty(name)) {
				return allModules[name];
			} else {
				throw 'Module '+ name + ' does not exist!';
			}
		};
		// console.log('this', this);
		// return global.framer;
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
			// console.log('subscribe');
		},

		unsubscribe: function (type, callback) {
			this.visitSubscribers('unsubscribe', type, callback);
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

