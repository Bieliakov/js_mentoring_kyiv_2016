export default function Events() {

	var subscribers = {
		'pubsub': [], // event type: 'pubsub'
	};

	return {
		subscribe: subscribe,
		publish: publish
	}

	function subscribe(type, callback) {
		type = type || 'pubsub';
		if (typeof subscribers[type] === 'undefined') {
			subscribers[type] = [];
		}
		subscribers[type].push(callback);
	}

	function publish(type, someDataForPublishing){
		visitSubscribers('publish', type, someDataForPublishing);
	}

	function visitSubscribers(action, type, arg) {
		var pubtype = type || 'pubsub';
		var subscribersForCurrentEvent = subscribers[pubtype];
		var i;
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