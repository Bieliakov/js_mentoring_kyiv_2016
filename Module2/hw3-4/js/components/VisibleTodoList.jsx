
import { getVisibleTodos } from '../helpers';
import actions from '../actions';

import TodoList from './TodoList.jsx';

class VisibleTodoList extends React.Component {

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();
        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        props.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id => 
                    store.dispatch({
                        type: actions.types.TOGGLE_TODO,
                        payload: {
                            id
                        }
                    })
                }
            />
        )
    }
}

// specifying which context I want to receive. Required
VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
};

export default VisibleTodoList;

