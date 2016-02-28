import { getVisibleTodos } from '../helpers';
import constants from '../constants';
import actions from '../actions';
import Utils from '../helpers/utils.js';

import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNewTodoKeyDown(event) {
        if (event.keyCode !== constants.keyCodes.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        let input = event.target;

        if (input.value) {
            this.store.dispatch({
                type: actions.types.ADD_TODO,
                payload: {
                    title: input.value,
                    id: Utils.uuid(),
                    completed: false,
                    editText: input.value,
                    editMode: false
                }
            });
            input.value = '';
        }
    }

    toggleAll(event){
        let checkedBoolean = event.target.checked;
        this.store.dispatch({
            type: actions.types.TOGGLE_ALL,
            payload: {
                completed: checkedBoolean
            }
        })
    }

    checked() {
        return getVisibleTodos( this.props.todos, constants.filters.SHOW_ACTIVE ).length === 0;
    }

    render() {
        const { store } = this.context;
        this.store = store;

        return (
            <div>
                <Checkbox
                    style={{display: 'inline-block', width: 'calc(10%-16px)', paddingLeft: '16px'}}
                    type="checkbox"
                    checked={this.checked()}
                    onCheck={this.toggleAll.bind(this)}
                />
                <TextField
                    style={{ display: 'inline-block', width: '90%'}}
                    hintText="What needs to be done?"
                    onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                    autoFocus={true}
                />
            </div>
        )
    }
}

AddTodo.contextTypes = {
    store: React.PropTypes.object
};

export default AddTodo;