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
                < CommentListContainer data = {store.getState()} />
                < CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} / >
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

class CommentForm extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        var author = this.authorInput.value.trim();
        var text = this.textInput.value.trim();
        if (!text || !author) {
            return;
        };
        let comment = {author: author, text: text};
        console.log('comment', comment)
        this.props.onCommentSubmit(comment);
        this.authorInput.value = '';
        this.textInput.value = '';
    }

    render() {
        return ( 
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
            <input
                type="text"
                placeholder="Your name"
                ref={node => this.authorInput = node}/>
            <input
                type="text"
                placeholder="Say something..."
                ref={node => this.textInput = node}/>
            <input type="submit" value="Post" />
          </form>
        )
    }
};

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
    <Provider> 
        < CommentBox / > 
    <Provider />,
    document.getElementById('app'));



