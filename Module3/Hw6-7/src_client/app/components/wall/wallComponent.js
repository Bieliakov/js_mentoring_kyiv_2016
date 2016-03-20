/*global framer*/

import addPostTemplate from './addPostTemplate.handlebars';
import postsTemplate from './postsTemplate.handlebars';
import postTemplate from './postTemplate.handlebars';
import postsListTemplate from './postsListTemplate.handlebars';
import commentsTemplate from './commentsTemplate.handlebars';
import commentTemplate from './commentTemplate.handlebars';
import wallService from '../shared/services/index.js';

const wallName = 'wall';
const limitPostsNumber = 10;
const limitCommentsNumber = 10;
const initialCommentsDisplayNumber = 3;

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

			// long pooling implementation
			subscribe();

			function subscribe(){
				var xhr = new XMLHttpRequest();

				xhr.open('GET', '/api/post/subscribe', true);

				xhr.onload = function() {
					let repsonse = JSON.parse(this.responseText);
					if (repsonse.comments) {
						handlePostAddition(repsonse);
					} else if (typeof repsonse.post === 'string') {
						handleCommentAddition(repsonse)
					}

					function handlePostAddition(responseFromServer) {
						let post = responseFromServer;
						post.username = wallService.currentUser.getUser();

						// creating domNode from string
						let wrapper= document.createElement('div');
						wrapper.innerHTML= postTemplate(post);
						let postHTML = wrapper.firstChild;

						view.$postsList = document.querySelector('[data-post=list]');
						let firstPostInDom = view.$postsList.firstChild;
						view.$postsList.insertBefore(postHTML, firstPostInDom)
					}

					function handleCommentAddition(responseFromServer) {
						let comment = responseFromServer;

						if (comment.author === wallService.currentUser.getUser()) {
							comment.my = true;
						}

						// creating domNode from string
						let wrapper= document.createElement('div');
						wrapper.innerHTML= commentTemplate(comment);
						let commentHTML = wrapper.firstChild;
						let currentPostCommentsInDOM = document.querySelector(`[data-post-comments="${comment.post}"]`);
						let firstCommentInDom = currentPostCommentsInDOM.firstChild;

						currentPostCommentsInDOM.insertBefore(commentHTML, firstCommentInDom)
					}
					
					subscribe();
				};

				xhr.onerror = xhr.onabort = function() {
					setTimeout(subscribe, 500);
				};

				xhr.send('');
			}

			view.mainElement.onsubmit = function(event) {
				event.preventDefault();
				let element = event.target;
				let submitAction = element.getAttribute('data-action');
				
				if(submitAction === 'addComment') {
					let postId = element.getAttribute('data-post-id');
					let $commentBody = element.querySelector('[data-comment=commentBody]');
					let commentBody = $commentBody.value;

					$commentBody.value = '';

					let formData = {
						action: submitAction,
						text: commentBody
					};
					moduleInstance.model.put('post/' + postId, formData);
				} else if(submitAction === 'addPost') {
					let $postBody = element.querySelector('[data-post=postBody]');
					let postBody = $postBody.value;
					$postBody.value = '';
					let $postTitle = element.querySelector('[data-post=postTitle]');
					let postTitle = $postTitle.value;
					$postTitle.value = '';
					let formData = {
						title: postTitle,
						body: postBody
					};
					moduleInstance.model.post('post/', formData);
				}
				
			};

			view.$posts.onclick = function(event) {
				let element = event.target;
				let action = element.getAttribute('data-action');

				if(action === 'deleteComment') {

					let postId = element.getAttribute('data-post-id');
					let commentId = element.getAttribute('data-comment-id');

					let formData = {
						commentId: commentId,
						action: action
					};

					moduleInstance.model.put('post/' + postId, formData);
				} else if (action === 'getMoreComments') {

					let postId = element.getAttribute('data-post-id');

                    let currentResponse = wallService.currentResponse.getResponse();
                    let currentPost = currentResponse.posts.find(function findInArray(post) {
                        return post._id === postId;
                    });
                    let previousAddedCommentsNumber = currentPost.addedCommentsNumber || 0;

                    currentPost.addedCommentsNumber = previousAddedCommentsNumber + limitCommentsNumber;

                    if (currentPost.addedCommentsNumber + initialCommentsDisplayNumber <= currentPost.comments.length) {
                        currentPost.addedComments = currentPost.comments.slice(
                            previousAddedCommentsNumber + initialCommentsDisplayNumber,
                            currentPost.addedCommentsNumber + initialCommentsDisplayNumber
                        );
                    } else {
                        currentPost.addedComments = currentPost.comments.slice(previousAddedCommentsNumber + initialCommentsDisplayNumber);
                        currentPost.addedCommentsNumber = currentPost.comments.length - initialCommentsDisplayNumber;
                    }
                    if (currentPost.addedCommentsNumber + initialCommentsDisplayNumber >= currentPost.comments.length) {
                        element.classList.add('is-hidden');
                    }
                    element.classList.remove('is-not-hidden');
                    let compiledCommentsTemplate = commentsTemplate(currentPost);
                    let htmlComments = fragmentFromString(compiledCommentsTemplate);

                    // dirty hack :)
                    element.parentNode.insertBefore(htmlComments, element)

				} else if (action === 'pagination') {
					var userFilter = wallService.currentFilter.getFilter();

					if (userFilter) {
						moduleInstance.model.get('user/' + userFilter + '/post' +
						'?page=' + element.value +
						'&countpage=' + limitPostsNumber +
						'&count=' + wallService.currentCount.getCount())
						.then((response) => {
							let parsedResponse = JSON.parse(response);
							wallService.currentUser.setUser(parsedResponse.username);
							wallService.currentResponse.setResponse(parsedResponse);
							view.$postsList.innerHTML = postsListTemplate(parsedResponse);
						});
					}
					// form query in function
					moduleInstance.model.get('post' + 
						'?page=' + element.value +
						'&countpage=' + limitPostsNumber +
						'&count=' + wallService.currentCount.getCount())
						.then((response) => {
							let parsedResponse = JSON.parse(response);
							wallService.currentUser.setUser(parsedResponse.username);
							wallService.currentResponse.setResponse(parsedResponse);
							view.$postsList.innerHTML = postsListTemplate(parsedResponse);
						});
				}
				
			};

			// get initial posts state
			moduleInstance.model.get('post/').then((response) => {

				let parsedResponse = JSON.parse(response);
				wallService.currentUser.setUser(parsedResponse.username);
				parsedResponse.posts = mapPostsComments(parsedResponse.posts, parsedResponse.username);

				parsedResponse.postsPaginationArray = createPaginationArray(parsedResponse.count, limitPostsNumber);
				wallService.currentCount.setCount(parsedResponse.count);
				wallService.currentResponse.setResponse(parsedResponse);

				view.$addPost.innerHTML = addPostTemplate(parsedResponse);
				view.$posts.innerHTML = postsTemplate(parsedResponse);
				view.$postsList = document.querySelector('[data-post=list]');
				view.$postsList.innerHTML = postsListTemplate(parsedResponse);
				view.filter = document.querySelector('[data-wall=filter]');
				if (view.filter) {
					view.filter.onclick = function(event) {

						if (view.filter.checked === true) {
							moduleInstance.model.get('user/' + parsedResponse.username + '/post').then((response) => {
								let parsedResponseInner = JSON.parse(response);
								wallService.currentUser.setUser(parsedResponse.username);
								parsedResponseInner.posts = mapPostsComments(parsedResponseInner.posts, parsedResponse.username);
								parsedResponseInner.postsPaginationArray = createPaginationArray(parsedResponseInner.count, limitPostsNumber);
								wallService.currentCount.setCount(parsedResponse.count);
								wallService.currentFilter.setFilter(parsedResponse.username);
								wallService.currentResponse.setResponse(parsedResponseInner);
								view.$posts.innerHTML = postsTemplate(parsedResponseInner);
								// TODO: remove duplicates and this hirrible code :)
								view.$postsList = document.querySelector('[data-post=list]');
								view.$postsList.innerHTML = postsListTemplate(parsedResponseInner);
							});
						} else {
							moduleInstance.model.get('post/').then((response) => {
								let parsedResponseInner = JSON.parse(response);
								wallService.currentUser.setUser(parsedResponseInner.username);
								parsedResponseInner.postsPaginationArray = createPaginationArray(parsedResponseInner.count, limitPostsNumber);
								wallService.currentResponse.setResponse(parsedResponseInner);
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
		post.firstComments = post.comments.slice(0, initialCommentsDisplayNumber);
		post.hasMoreComments = post.comments.length > post.firstComments.length;
		return post;
	});
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

function fragmentFromString(strHTML) {
    var temp = document.createElement('template');
    temp.innerHTML = strHTML;
    return temp.content;
}

export default wallName;
