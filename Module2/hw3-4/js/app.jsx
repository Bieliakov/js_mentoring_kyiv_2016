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

console.log('ReactDom', React.findDOMNode)

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme.js'
const MuiTheme = ThemeManager.getMuiTheme( LightRawTheme );

import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';

// import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';

import TextField from 'material-ui/lib/text-field';
// console.log('')

// // import Checkbox from 'material-ui/lib/checkbox';
// MuiTheme.setPalette({
//     primary1Color: Colors.blue500,
//     primary1Color: Colors.blue700,
//     primary1Color: Colors.blue100,

// })


var app = {};

window.app = app;
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';

import TodoFooter from './footer.jsx';
import TodoItem from './todoItem.jsx';
import TodoModel from './todoModel.js';

var ENTER_KEY = 13;

var TodoApp = React.createClass({

    // the key passed through context must be called "muiTheme"
    childContextTypes : {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: MuiTheme,
        };
    },

    getInitialState: function () {
        return {
            nowShowing: app.ALL_TODOS,
            editing: null,
            newTodo: ''
        };
    },

    componentDidMount: function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
            '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
            '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
        });
        router.init('/');
    },

    handleChange: function (event) {
        this.setState({newTodo: event.target.value});
    },

    handleNewTodoKeyDown: function (event) {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var val = this.state.newTodo.trim();

        if (val) {
            this.props.model.addTodo(val);
            this.setState({newTodo: ''});
        }
    },

    toggleAll: function (event) {
        var checked = event.target.checked;
        this.props.model.toggleAll(checked);
    },

    toggle: function (todoToToggle) {
        this.props.model.toggle(todoToToggle);
    },

    destroy: function (todo) {
        this.props.model.destroy(todo);
    },

    edit: function (todo) {
        this.setState({editing: todo.id});
    },

    save: function (todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    },

    cancel: function () {
        this.setState({editing: null});
    },

    clearCompleted: function () {
        this.props.model.clearCompleted();
    },

    render: function () {
        var footer;
        var main;
        var todos = this.props.model.todos;

        var shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
            case app.ACTIVE_TODOS:
                return !todo.completed;
            case app.COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
            }
        }, this);

        var todoItems = shownTodos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
                
            );
        }, this);

        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />
        }

        if (todos.length) {
            main = (
                <section className="main">

                    <List className="todo-list">
                        {todoItems}
                    </List>
                </section>
            );
        }

        return (
            <Paper
                zDepth={2}
                style={{width: '1000px', margin: 'auto'}}
                >
                <header className="header">
                    <h1>todos</h1>
                    <div>
                    <Checkbox
                        style={{display: 'inline-block !important'}}
                        className="toggle-all"
                        type="checkbox"
                        onCheck={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <TextField
                        style={{display: 'inline-block !important'}}
                        hintText="What needs to be done?"
                        className="new-todo"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                    </div>
                </header>
                {main}
                {footer}
            </Paper>
        );
    }
});

var model = new TodoModel('react-todos');
console.log('ReactDOM',ReactDOM)
function render() {
    ReactDOM.render(
        <TodoApp model={model}/>,
        document.getElementsByClassName('todoapp')[0]
    );
}

model.subscribe(render);
render();

export default TodoApp;
