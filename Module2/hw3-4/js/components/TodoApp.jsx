import AddTodo from './AddTodo.jsx';
import VisibleTodoList from './VisibleTodoList.jsx';
import TodoFooter from './TodoFooter.jsx';


import Paper from 'material-ui/lib/paper';

class TodoApp extends React.Component {

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        }) ;
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const props = this.props;
        const { store } = this.context;
        const state = store.getState();
        const todos = state.todos;

        let activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        let completedCount = todos.length - activeTodoCount;

        return (
            <Paper
                zDepth={2}
                style={{minWidth: 900, width: '70%', margin: 'auto'}}>
                <header className="header">
                    <h1 style={{textAlign: 'center', paddingTop: 20}}>todos</h1>
                    <AddTodo todos={todos}/>
                </header>
                <VisibleTodoList todos={todos}/>
                <TodoFooter 
                    count={activeTodoCount}
                    completedCount={completedCount}
                />
            </Paper>
        )
    }
}
    
TodoApp.contextTypes = {
    store: React.PropTypes.object
};

export default TodoApp;