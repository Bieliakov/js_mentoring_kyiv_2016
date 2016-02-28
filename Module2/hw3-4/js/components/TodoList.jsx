import TodoItem from './TodoItem.jsx';

const TodoList = ({todos, onTodoClick}) => (
    <ul>
    {   
        todos.map(todo => 
            <TodoItem
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )
    }
    </ul>
)

export default TodoList;