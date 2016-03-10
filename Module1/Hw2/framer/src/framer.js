/*global window*/

import Router from './router/router.js';
import Module from './module/module.js';
import ajax from './ajax/ajax.js';
import Events from './events/events.js';
import Q from 'q';

var framer = (function framerIIFE(global){

	var module = new Module(global);
	var router = new Router(global);
	var events = new Events();
    let ajax = Ajax(global.XMLHttpRequest, Q)

	return {
		module: module,
		router: router,
		events: events
	}

})(window);

window.framer = framer;

export default framer;
