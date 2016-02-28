import constants from '../constants';

const getVisibleTodos = (
    todos, filter
) => {
    switch (filter) {
        case constants.filters.SHOW_ALL:
            return todos;
        case constants.filters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case constants.filters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

export { getVisibleTodos };