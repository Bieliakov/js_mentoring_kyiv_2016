import Router from './router';
import Module from './module';

console.log('Router',Router);

var framer = (function framerIIFE(global){

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
		module: new Module(global),
		router: new Router(global),
		events: events
	}

})(window);

window.framer = framer;
