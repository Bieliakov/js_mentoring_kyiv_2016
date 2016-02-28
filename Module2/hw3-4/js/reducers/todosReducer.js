import todoReducer from './todoReducer';
import actions from '../actions';

const todosReducer = (state = [], action) => {
    
    switch (action.type) {
        case actions.types.ADD_TODO:
            return state.concat(todoReducer(undefined,action));
        case actions.types.START_EDITING_TODO:
            return state.map(item => todoReducer(item, action));
        case actions.types.EDIT_TODO:
            return state.map(item => todoReducer(item, action));
        case actions.types.DONE_EDITING_TODO:
            return state.map(item => todoReducer(item, action));
        case actions.types.UNDO_EDITING_TODO:
            return state.map(item => todoReducer(item, action));
        case actions.types.TOGGLE_TODO:
            return state.map(item => todoReducer(item, action));
        case actions.types.DELETE_TODO:
            return state.filter(item => item.id !== action.payload.id);
        case actions.types.TOGGLE_ALL:
            return state.map(item => Object.assign({}, item, {
                completed: action.payload.completed
            }));
        case actions.types.CLEAR_COMPLETED:
            return state.filter(item => item.completed !== true);
        default:
            return state;
    }
}

export default todosReducer;