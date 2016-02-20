import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

// import App from './components/Main';
require('normalize.css');
require('styles/App.css');

const reducer = (state = [{id: 1, author: 'Alex', text: "Lalala"}], action) => {
    switch(action.type){
        case 'ADD_COMMENT':
            return state.concat(action.payload);
        default:
            return state;
    }
}

const store = createStore(reducer);

const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    payload: comment
});

class CommentBox extends React.Component {

    handleCommentSubmit(comment) {
        comment.id = new Date().getTime();

        store.dispatch(addComment(comment));

        // TODO: submit to the server and refresh the list
    }

    render() {
        return (
            < div className = "commentBox" >
                < h1 > Comments: < /h1>
                < CommentListContainer />
                < CommentFormContainer / >
            < /div>
        )
    }
}

let CommentList = ({comments}) => (

    < div className = "commentList" >
        {comments.map(function(comment) {
            return ( 
                < Comment author = {comment.author} date={comment.id} key={comment.id}> 
                {comment.text}
                < /Comment>);
        })}
    < /div>
);

const mapStateToCommentListProps = (state) => ({
    comments: state
});

const CommentListContainer = connect(mapStateToCommentListProps)(CommentList);


const CommentForm = ({onCommentSubmit}) => {
        var author;
        var text;
  
        return ( 
            <form className="commentForm" 
            onSubmit = {(e) => {
           
                e.preventDefault();
                onCommentSubmit(author.value, text.value);
            }

            }>
            <input
                type="text"
                placeholder="Your name"
                ref={node => author = node}/>
            <input
                type="text"
                placeholder="Say something..."
                ref={node => text = node}/>
            <input type="submit" value="Post" />
          </form>
        )
    
};

const mapDispatchToCommentListProps = (dispatch) => ({
    onCommentSubmit: (author, text) => {
        dispatch(addComment({
            author: author,
            text: text
        }));
    }
    
});
const CommentFormContainer = connect(null, mapDispatchToCommentListProps)(CommentForm);


class Comment extends React.Component {
    render() {
        return ( < div className = "comment" >
            < h2 className = "commentAuthor" >{this.props.date} {this.props.author} < /h2> {
            this.props.children
        } < /div>
    )};
};

CommentBox.defaultProps = {};
// Render the main component into the dom


ReactDOM.render(
    <Provider store={store}> 
        < CommentBox /> 
    </Provider>, document.getElementById('app'));



