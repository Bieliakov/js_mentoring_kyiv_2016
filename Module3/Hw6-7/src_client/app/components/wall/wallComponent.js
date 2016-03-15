/*global framer*/

import addPostTemplate from './addPostTemplate.handlebars';
import postsTemplate from './postsTemplate.handlebars';
import postsListTemplate from './postsListTemplate.handlebars';
var wallName = 'wall';
const limitPostsAndCommentsNumber = 10;

framer
	.module(wallName, [])
	.model('mainModel', function() {

	})
	.view('someCoolView', function(moduleInstance){
		var view = this;
		view.init = init;
		function init() {
			view.mainElement = document.getElementById('main');
			view.$addPost = document.querySelector('[data-id=addPost]');
			view.$posts = document.querySelector('[data-id=posts]');

			view.$posts.onsubmit = function(event) {
				console.log('in submit event')
				event.preventDefault();
				let element = event.target;
				let submitAction = element.getAttribute('data-action');
				
				if(submitAction === 'addComment') {
					let postId = element.getAttribute('data-post-id');
					let $commentBody = element.querySelector('[data-comment=commentBody]');
					let commentBody = $commentBody.value;

					let formData = {
						action: submitAction,
						text: commentBody
					}
					moduleInstance.model.put('post/' + postId, formData);
				}
				
			}

			view.$posts.onclick = function(event) {
				console.log('in click event');
				// event.preventDefault();
				let element = event.target;
				let action = element.getAttribute('data-action');
				
				let query = '';

				if(action === 'deleteComment') {

					let postId = element.getAttribute('data-post-id');
					let commentId = element.getAttribute('data-comment-id');
				// 	let $commentBody = element.querySelector('[data-comment=commentBody]');
				// 	let commentBody = $commentBody.value;

					let formData = {
						commentId: commentId,
						action: action
					}

					moduleInstance.model.put('post/' + postId, formData);
				} else if (action === 'pagination') {
					console.log('element.value', element.value)	
					var userFilter = currentFilter.getFilter();

					if (userFilter) {
						moduleInstance.model.get('user/' + userFilter + '/post' +
						'?page=' + element.value +
						'&countpage=' + limitPostsAndCommentsNumber +
						'&count=' + currentCount.getCount())
						.then((response) => {
							let parsedResponse = JSON.parse(response);
							view.$postsList.innerHTML = postsListTemplate(parsedResponse);
						});
					}
					// form query in function
					moduleInstance.model.get('post' + 
						'?page=' + element.value +
						'&countpage=' + limitPostsAndCommentsNumber +
						'&count=' + currentCount.getCount())
						.then((response) => {
							let parsedResponse = JSON.parse(response);
							view.$postsList.innerHTML = postsListTemplate(parsedResponse);
						});
				}
				
			}

			// view.mainElement.style.backgroundColor = 'red';
			// view.mainElement.innerHTML = '';
			// get initial posts state
			moduleInstance.model.get('post/').then((response) => {
				console.log('response', response);
				let parsedResponse = JSON.parse(response);

				parsedResponse.posts = mapPostsComments(parsedResponse.posts, parsedResponse.username);

				parsedResponse.postsPaginationArray = createPaginationArray(parsedResponse.count, limitPostsAndCommentsNumber);
				currentCount.setCount(parsedResponse.count);
				console.log('parsedResponse', parsedResponse);

				// 				personIsJohn: function() {
				//   return this.get('person') === 'John';
				// }.property('person')
				view.$addPost.innerHTML = addPostTemplate(parsedResponse);
				view.$posts.innerHTML = postsTemplate(parsedResponse);
				view.$postsList = document.querySelector('[data-post=list]');
				view.$postsList.innerHTML = postsListTemplate(parsedResponse);
				view.filter = document.querySelector('[data-wall=filter]');
				if (view.filter) {
					// let checked = view.filter.checked;
					view.filter.onclick = function(event) {
						console.log('view.filter.checked', view.filter.checked);

						if (view.filter.checked === true) {
							// checked = view.filter.checked;
							moduleInstance.model.get('user/' + parsedResponse.username + '/post').then((response) => {
								let parsedResponseInner = JSON.parse(response);
								console.log('parsedResponseInner', parsedResponseInner);
								parsedResponseInner.posts = mapPostsComments(parsedResponseInner.posts, parsedResponse.username);
								parsedResponseInner.postsPaginationArray = createPaginationArray(parsedResponseInner.count, limitPostsAndCommentsNumber);
								currentCount.setCount(parsedResponse.count);
								currentFilter.setFilter(parsedResponse.username);
								view.$posts.innerHTML = postsTemplate(parsedResponseInner);
								// remove duplicates and this hirrible code :)
								view.$postsList = document.querySelector('[data-post=list]');
								view.$postsList.innerHTML = postsListTemplate(parsedResponseInner);
							});
						} else {
							moduleInstance.model.get('post/').then((response) => {
								let parsedResponseInner = JSON.parse(response);
								parsedResponseInner.postsPaginationArray = createPaginationArray(parsedResponseInner.count, limitPostsAndCommentsNumber);
								view.$posts.innerHTML = postsTemplate(parsedResponseInner);
								view.$postsList.innerHTML = postsListTemplate(parsedResponseInner);
							});
						}						
					}
				}

			});

			
		}
	})
	.controller('thirdController', function(moduleInstance) {
		
		var ctrl = this;

		ctrl.init = init;

		function init () {
			moduleInstance.view.init();
		}
	});

function createPaginationArray(count, pageLimit) {
	let paginationArray = [];
	let paginationNumber = Math.ceil(count / pageLimit);
	for (let i = 1; i <= paginationNumber; i++) {
		paginationArray.push(i);
	}
	return paginationArray;
}

function mapPostsComments(posts, propertyForMapping) {
	return posts.map((post) => {
		post.comments = mapCommentsWithMyProperty(post.comments, propertyForMapping);
		return post;
	}) 
}
// it is better to do through handlebars helper for equality operator
function mapCommentsWithMyProperty (array, property) {
	return array.map((comment) => {
		if (comment.author === property) {
			comment.my = true;
		}
		return comment;
	});
}

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

export default wallName;