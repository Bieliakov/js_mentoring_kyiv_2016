/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import mui from 'material-ui';
import Utils from './utils.js';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme.js'
const MuiTheme = ThemeManager.getMuiTheme( LightRawTheme );

import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
// import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';

import TextField from 'material-ui/lib/text-field';



const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return action.payload;
        case 'TOGGLE_TODO':
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

const todosReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat(todoReducer(undefined,action));
        case 'TOGGLE_TODO':
            return state.map(item => todoReducer(item, action));
        default:
            return state;
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.payload.filter;
        default:
            return state;
    }
};

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

// const todoAppReducer = (state = {}, action) => {
//     console.log('state', state);
//     return {
//         todos: todosReducer(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// };

const todoApp = combineReducers({
    todos: todosReducer,
    visibilityFilter
});

var app = {};

window.app = app;
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';

// import TodoFooter from './footer.jsx';
import TodoItem from './todoItem.jsx';
import TodoModel from './todoModel.js';

var ENTER_KEY = 13;

const getVisibleTodos = (
    todos, filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed);
    }
}

const Link = ({
    children,
    active,
    onClick
}) => {
    if(active) {
        return <span>{children}</span>
    }
    return (
        <a href='#'
            onClick={ e => {
                e.preventDefault();
                onClick();
            }}>
            {children}
        </a>
    )
}

class FilterLink extends React.Component {
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

        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={() => 
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        payload: {
                            filter: props.filter
                        }
                    })
                }
            >
                {props.children}
            </Link>
        )
    }
}

FilterLink.contextTypes = {
    store: React.PropTypes.object
};

const TodoFooter = () => (
    <p>
    Show:
        {' '}
    <FilterLink
        filter='SHOW_ALL'
    > 
        All
    </FilterLink>
        {', '}
    <FilterLink
        filter='SHOW_ACTIVE'
    > 
        Active
    </FilterLink>
        {', '}
    <FilterLink
        filter='SHOW_COMPLETED'
    > 
        Completed
    </FilterLink>
</p>    
)

const AddTodo = (props, { store }) => {
    let input;

    function handleNewTodoKeyDown(event) {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        let input = event.target;
        event.preventDefault();

        let val = input.value;

        if (val) {
            store.dispatch({
                type:'ADD_TODO',
                payload: {
                    title: input.value,
                    id: Utils.uuid(),
                    completed: false
                }
            });
            input.value = '';
        }
    }

    return (
        <div>
            <Checkbox
                style={{display: 'inline-block', width: 'calc(10%-16px)', paddingLeft: '16px'}}
                type="checkbox"
            />
            <TextField
                ref={node => {
                    input = node;
                }}
                style={{ display: 'inline-block', width: '90%'}}
                hintText="What needs to be done?"
                onKeyDown={handleNewTodoKeyDown}
                autoFocus={true}
            />
        </div>

    )
}
//onCheck={this.toggleAll}
//checked={activeTodoCount === 0}


//value={this.state.newTodo}
// onChange={this.handleChange}
AddTodo.contextTypes = {
    store: React.PropTypes.object
};

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

// const mapStateToProps = (state) => {
//     return {
//         todos: getVisibleTodos(
//             state.todos,
//             state.visibilityFilter
//         )
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onTodoClick: (id) => { 
//             dispatch({
//                 type: 'TOGGLE_TODO',
//                 id
//             })
//         }
//     };
// };

class VisibleTodoList extends React.Component {

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

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id => 
                    store.dispatch({
                        type: 'TOGGLE_TODO',
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



class TodoApp extends React.Component {

    render() {
        return (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <TodoFooter />
            </div>
        )
    }
}
    
TodoApp.contextTypes = {
    store: React.PropTypes.object
};

// import { createStore } from 'redux';

const createStore = (reducer) => {
    let state;
    let listeners = [];
    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners.filter(l => l !== listener);
        }
    };

    // for returning initial value from reducer
    dispatch({});

    return {getState, dispatch, subscribe};
}


// import {Provider} from 'react-redux';
class Provider extends React.Component {

    getChildContext() {
        return {
            store: this.props.store,
            muiTheme: this.props.muiTheme
        }
    }

    render() {
        return this.props.children;
    }
}

// eesintial for the getChildContext feature to be turned on
Provider.childContextTypes = {
    store: React.PropTypes.object,
    muiTheme: React.PropTypes.object
};

ReactDOM.render(
    <Provider
        store={createStore(todoApp)}
        muiTheme={MuiTheme}
    >
        <TodoApp />
    </Provider>,
    document.getElementsByClassName('todoapp')[0]
);

// const TodoApp = React.createClass({

//     // the key passed through context must be called "muiTheme"
//     childContextTypes : {
//         muiTheme: React.PropTypes.object
//     },

//     getChildContext: function() {
//         return {
//             muiTheme: MuiTheme,
//         };
//     },

//     getInitialState: function () {
//         return {
//             nowShowing: app.ALL_TODOS,
//             editing: null,
//             newTodo: ''
//         };
//     },

//     componentDidMount: function () {
//         var setState = this.setState;
//         var router = Router({
//             '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
//             '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
//             '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
//         });
//         router.init('/');
//     },

//     handleChange: function (event) {
//         this.setState({newTodo: event.target.value});
//     },

//     handleNewTodoKeyDown: function (event) {
//         if (event.keyCode !== ENTER_KEY) {
//             return;
//         }

//         event.preventDefault();

//         var val = this.state.newTodo.trim();

//         if (val) {
//             this.props.model.addTodo(val);
//             this.setState({newTodo: ''});
//         }
//     },

//     toggleAll: function (event) {
//         var checked = event.target.checked;
//         this.props.model.toggleAll(checked);
//     },

//     toggle: function (todoToToggle) {
//         this.props.model.toggle(todoToToggle);
//     },

//     destroy: function (todo) {
//         this.props.model.destroy(todo);
//     },

//     edit: function (todo) {
//         this.setState({editing: todo.id});
//     },

//     save: function (todoToSave, text) {
//         this.props.model.save(todoToSave, text);
//         this.setState({editing: null});
//     },

//     cancel: function () {
//         this.setState({editing: null});
//     },

//     clearCompleted: function () {
//         this.props.model.clearCompleted();
//     },

//     render: function () {
//         var footer;
//         var main;
//         var todos = this.props.model.todos;

//         var shownTodos = todos.filter(function (todo) {
//             switch (this.state.nowShowing) {
//             case app.ACTIVE_TODOS:
//                 return !todo.completed;
//             case app.COMPLETED_TODOS:
//                 return todo.completed;
//             default:
//                 return true;
//             }
//         }, this);

//         var todoItems = shownTodos.map(function (todo) {
//             return (
//                 <TodoItem
//                     key={todo.id}
//                     todo={todo}
//                     onToggle={this.toggle.bind(this, todo)}
//                     onDestroy={this.destroy.bind(this, todo)}
//                     onEdit={this.edit.bind(this, todo)}
//                     editing={this.state.editing === todo.id}
//                     onSave={this.save.bind(this, todo)}
//                     onCancel={this.cancel}
//                 />
                
//             );
//         }, this);

//         var activeTodoCount = todos.reduce(function (accum, todo) {
//             return todo.completed ? accum : accum + 1;
//         }, 0);

//         var completedCount = todos.length - activeTodoCount;

//         if (activeTodoCount || completedCount) {
//             footer =
//                 <TodoFooter
//                     count={activeTodoCount}
//                     completedCount={completedCount}
//                     nowShowing={this.state.nowShowing}
//                     onClearCompleted={this.clearCompleted}
//                 />
//         }

//         if (todos.length) {
//             main = (
//                 <section className="main">

//                     <List className="todo-list">
//                         {todoItems}
//                     </List>
//                 </section>
//             );
//         }

//         return (
//             <Paper
//                 zDepth={2}
//                 style={{width: '1000px', margin: 'auto'}}
//                 >
//                 <header className="header">
//                     <h1 style={{textAlign: 'center', paddingTop: '20px'}}>todos</h1>
//                     <div>
//                         <Checkbox
//                             style={{display: 'inline-block', width: 'calc(10%-16px)', paddingLeft: '16px'}}
//                             className="toggle-all"
//                             type="checkbox"
//                             onCheck={this.toggleAll}
//                             checked={activeTodoCount === 0}
//                         />
//                         <TextField
//                             style={{ display: 'inline-block', width: '90%'}}
//                             hintText="What needs to be done?"
//                             className="new-todo"
//                             value={this.state.newTodo}
//                             onKeyDown={this.handleNewTodoKeyDown}
//                             onChange={this.handleChange}
//                             autoFocus={true}
//                         />
//                     </div>
//                 </header>
//                 {main}
//                 {footer}
//             </Paper>
//         );
//     }
// });

// var model = new TodoModel('react-todos');


// const render = () => {
//     ReactDOM.render(
//         <TodoApp model={model}/>,
//         document.getElementsByClassName('todoapp')[0]
//     );
// }


// model.subscribe(render);


export default TodoApp;
