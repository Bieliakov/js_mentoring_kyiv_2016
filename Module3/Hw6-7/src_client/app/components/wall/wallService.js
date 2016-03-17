var currentCount = (function currentCount() {
	var count;

	return {
		getCount: getCount,
		setCount: setCount
	}

	function getCount() {
		return count;
	}

	function setCount(newCount) {
		count = newCount;
	}
})();

var currentFilter = (function currentFilter() {
	var filter;

	return {
		getFilter: getFilter,
		setFilter: setFilter
	}

	function getFilter() {
		return filter;
	}

	function setFilter(newFilter) {
		filter = newFilter;
	}
})();

var currentResponse = (function currentResponse() {
	var response;

	return {
		getResponse: getResponse,
		setResponse: setResponse
	}

	function getResponse() {
		return response;
	}

	function setResponse(newResponse) {
		response = newResponse;
	}
})();

export default {
	currentCount: currentCount,
	currentFilter: currentFilter,
	currentResponse: currentResponse	
}
