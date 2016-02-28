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

import constants from '../constants';
import actions from '../actions';

class TodoItem extends React.Component {

    // for handling proper selection after double clicking an input field
    componentDidUpdate (prevProps) {
        if (!prevProps.editMode && this.editMode) {
            var node = ReactDOM.findDOMNode(this.refs.editFieldWrapper.refs.input);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }

    handleKeyDown(event) {
        if (event.which === constants.keyCodes.ESCAPE_KEY) {
            this.store.dispatch({
                type: actions.types.UNDO_EDITING_TODO,
                payload: {
                    id: this.id,
                    editText: this.title,
                    editMode: false
                }
            });
        } else if (event.which === constants.keyCodes.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }

    handleEdit(event) {
        this.store.dispatch({
            type: actions.types.START_EDITING_TODO,
            payload: {
                id: this.id,
                editMode: true
            }
        })
    }

    handleChange(event) {
        this.store.dispatch({
            type: actions.types.EDIT_TODO,
            payload: {
                id: this.id,
                editText: event.target.value
            }
        })
    }

    onDelete(event) {
        this.store.dispatch({
            type: actions.types.DELETE_TODO,
            payload: {
                id: this.id
            }
        })
    }

    handleSubmit(event) {
        this.store.dispatch({
            type: actions.types.DONE_EDITING_TODO,
            payload: {
                id: this.id,
                title: event.target.value,
                editMode: false
            }
        })

        // its maybe an event too
        event.target.blur();
    }

    render (){
        const {onClick, completed, id, title, editText, editMode} = this.props;
        const { store } = this.context;
        this.store = store;
        this.id = id;
        this.title = title;
        this.editMode = editMode;

        return (
            <ListItem >
                <Checkbox
                    style={{display: 'inline-block', width: 'calc(10%-16px)', paddingLeft: '16px'}}
                    checked={completed}
                    onClick={onClick}
                />
                <TextField
                    style={{ 
                        display: 'inline-block',
                        width: '90%', 
                        opacity:
                            completed ?
                                '0.4' :
                                '1'
                    }}
                    ref="editFieldWrapper"
                    onDoubleClick={this.handleEdit.bind(this)}
                    value={editText}
                    onChange={this.handleChange.bind(this)}
                    onBlur={this.handleSubmit.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    readOnly={!editMode}
                />
                <DeleteIcon
                    style={{position: 'absolute', right: '10px', top: '25%'}}
                    onClick={this.onDelete.bind(this)}
                />
            </ListItem>
        )
    }
}

TodoItem.contextTypes = {
    store: React.PropTypes.object
};

export default TodoItem;