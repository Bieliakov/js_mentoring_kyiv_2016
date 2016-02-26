/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass({
    handleSubmit: function (event) {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({editText: val});
        } else {
            this.props.onDestroy();
        }
    },

    handleEdit: function () {
        this.props.onEdit();
        this.setState({editText: this.props.todo.title});
    },

    handleKeyDown: function (event) {
        if (event.which === ESCAPE_KEY) {
            this.setState({editText: this.props.todo.title});
            this.props.onCancel(event);
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit(event);
        }
    },

    handleChange: function (event) {
        if (this.props.editing) {
            this.setState({editText: event.target.value});
        }
    },

    getInitialState: function () {
        return {editText: this.props.todo.title};
    },

    /**
     * This is a completely optional performance enhancement that you can
     * implement on any React component. If you were to delete this method
     * the app would still work correctly (and still be very performant!), we
     * just use it as an example of how little code it takes to get an order
     * of magnitude performance improvement.
     */
    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText
        );
    },

    /**
     * Safely manipulate the DOM after updating the state when invoking
     * `this.props.onEdit()` in the `handleEdit` method above.
     * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
     * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
     */
    componentDidUpdate: function (prevProps) {
         console.log('this.refs', this.refs)
        if (!prevProps.editing && this.props.editing) {
            console.log('this.refs.editField', this.refs.editField)
            var node = ReactDOM.findDOMNode(this.refs.editField);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    },

    render: function () {
        return (
            <ListItem
                className={classNames({
                    completed: this.props.todo.completed,
                    editing: this.props.editing
                })}
                >
                
                <Checkbox
                    style={{display: 'inline-block', width: 'calc(10%-16px)', paddingLeft: '16px'}}
                    className="toggle"
                    type="checkbox"
                    checked={this.props.todo.completed}
                    onClick={this.props.onToggle}
                />
                <TextField
                    style={{ display: 'inline-block', width: '90%'}}
                    ref="editField"
                    className="edit"
                    onDoubleClick={this.handleEdit}
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                <DeleteIcon
                    style={{position: 'absolute', right: '10px', top: '25%'}}
                    className="destroy"
                    onClick={this.props.onDestroy} />

                
            </ListItem>
        );
    }
});

// label={this.props.todo.title}


// <ListItem
//     className={classNames({
//         completed: this.props.todo.completed,
//         editing: this.props.editing
//     })}
//     leftCheckbox={
//         <Checkbox
//             checked={this.props.todo.completed}
//             onChange={this.props.onToggle}
//             onDoubleClick={this.handleEdit}
//             primaryText={this.props.todo.title} />
//         >
//     </Checkbox>}>
//      <button className="destroy" onClick={this.props.onDestroy} />
//     </div>
//     <input
//         ref="editField"
//         className="edit"
//         value={this.state.editText}
//         onBlur={this.handleSubmit}
//         onChange={this.handleChange}
//         onKeyDown={this.handleKeyDown}
//     />
// </ListItem>

export default TodoItem;