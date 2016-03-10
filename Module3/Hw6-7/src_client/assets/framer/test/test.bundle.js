/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(3);

	__webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _module = __webpack_require__(2);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Module', function () {

		var sut = new _module2.default(window);

		it('should exists', function () {
			expect(sut).toBeDefined();
		});
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Module;
	function Module(global) {

	    var allModules = {};

	    function createModule(name, dependencies) {

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
	        };

	        function Model(modelName, modelFuncCallback) {
	            modelFuncCallback.prototype = Object.create(modelFunctionality);
	            moduleInstance.model = new modelFuncCallback(global);
	            return moduleInstance;
	        }

	        var modelFunctionality = {
	            create: function create(data) {
	                moduleInstance.storage.create(moduleInstance.storage.storageName, Date.now(), data);
	            },
	            get: function get() {
	                moduleInstance.storage.get(moduleInstance.storage.storageName);
	            }
	        };

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
	            get: function get(storageName) {
	                return JSON.parse(global.localStorage[storageName]);
	            },
	            create: function create(storageName, newFieldName, newFieldData) {
	                var storage = JSON.parse(global.localStorage[storageName]);
	                storage[newFieldName] = newFieldData;
	                global.localStorage[storageName] = JSON.stringify(storage);
	                return storage;
	            }
	        };

	        allModules[name] = moduleInstance;
	        return moduleInstance;
	    }

	    function getModule(name) {
	        if (allModules.hasOwnProperty(name)) {
	            return allModules[name];
	        } else {
	            throw 'Module ' + name + ' does not exist!';
	        }
	    }

	    function module(name, dependencies) {
	        if (dependencies && allModules[name]) {
	            throw new Error(name + ' module is already registered!');
	        } else if (dependencies) {
	            return createModule(name, dependencies);
	        } else {
	            return getModule(name);
	        }
	    }

	    return module;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(4);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Router', function () {

		var sut = new _router2.default(window);

		it('should exists', function () {
			expect(sut).toBeDefined();
		});
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Router;
	/*global framer*/

	function Router(global) {

	    var self = this;

	    this.route = route;

	    var routes = {};

	    global.addEventListener('hashchange', hashChangeHandler);
	    global.addEventListener('load', hashChangeHandler);

	    function route(path /* moduleNames */) {
	        var moduleNamesArray = Array.prototype.slice.call(arguments, 1);
	        routes[path] = { moduleNames: moduleNamesArray };
	        return self;
	    }

	    function hashChangeHandler(event) {
	        event.preventDefault();

	        var hashLessURL = location.hash.slice(1) || '/';
	        var hashLessURLArray = hashLessURL.split('/');
	        var routeName = hashLessURLArray[0] || '/';
	        var routeElements = routes[routeName];

	        routeElements.moduleNames.forEach(function (moduleName) {
	            var module = framer.module(moduleName);
	            var moduleController = module.controller;
	            if (typeof moduleController.init === 'function') {
	                moduleController.init();
	            } else {
	                throw new Error('Please, define init function in contoller of ' + moduleName + '!');
	            }
	        });
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _events = __webpack_require__(6);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Events', function () {

		var sut = new _events2.default(window);

		it('should exists', function () {
			expect(sut).toBeDefined();
		});
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Events;
	function Events() {

		/*eslint quote-props: [2, "consistent"]*/

		var subscribers = {
			'pubsub': [] // event type: 'pubsub'
		};

		return {
			subscribe: subscribe,
			publish: publish
		};

		function subscribe(type, callback) {
			type = type || 'pubsub';
			if (typeof subscribers[type] === 'undefined') {
				subscribers[type] = [];
			}
			subscribers[type].push(callback);
		}

		function publish(type, someDataForPublishing) {
			visitSubscribers('publish', type, someDataForPublishing);
		}

		function visitSubscribers(action, type, arg) {
			var pubtype = type || 'pubsub';
			var subscribersForCurrentEvent = subscribers[pubtype];
			var subscribersLength = subscribersForCurrentEvent.length;

			for (var i = 0; i < subscribersLength; i++) {
				if (action === 'publish') {
					subscribersForCurrentEvent[i](arg);
				} else if (subscribers[i] === arg) {
					subscribersForCurrentEvent.splice(i, 1);
				}
			}
		}
	}

/***/ }
/******/ ]);