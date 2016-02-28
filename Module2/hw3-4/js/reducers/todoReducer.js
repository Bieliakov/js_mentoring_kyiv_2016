import actions from '../actions';

const todoReducer = (state, action) => {
    switch (action.type) {
        case actions.types.ADD_TODO:
            return action.payload;
        case actions.types.EDIT_TODO:
            if (state.id !== action.payload.id) {
                return state;
            }
            return Object.assign({}, state, {
                editText: action.payload.editText
            });
        case actions.types.UNDO_EDITING_TODO:
            if (state.id !== action.payload.id) {
                return state;
            }
            return Object.assign({}, state, {
                editText: action.payload.editText,
                editMode: action.payload.editMode
            });

        case actions.types.DONE_EDITING_TODO:
            if (state.id !== action.payload.id) {
                return state;
            }
            return Object.assign({}, state, {
                title: action.payload.title,
                editMode: action.payload.editMode
            });
        case actions.types.START_EDITING_TODO:
            if (state.id !== action.payload.id) {
                return state;
            }
            return Object.assign({}, state, {
                editMode: action.payload.editMode
            });
        case actions.types.TOGGLE_TODO:
            if (state.id !== action.payload.id) {
                return state;
            }
            return Object.assign({}, state, {
                completed: !state.completed
            });
        default:
            return state;
    }
};

export default todoReducer;