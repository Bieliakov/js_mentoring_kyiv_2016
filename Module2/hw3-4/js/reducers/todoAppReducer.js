import todosReducer from './todosReducer';
import actions from '../actions';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case actions.types.SET_VISIBILITY_FILTER:
            return action.payload.filter;
        default:
            return state;
    }
};

// polyfill for combineReducers func
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        );
    }
}

// simpler implementation of combineReducers function

// const todoAppReducer = (state = {}, action) => {
//     console.log('state', state);
//     return {
//         todos: todosReducer(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// };

const todoAppReducer = combineReducers({
    todos: todosReducer,
    visibilityFilter
});

export default todoAppReducer;