/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/

import mui from 'material-ui';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme.js'
const MuiTheme = ThemeManager.getMuiTheme( LightRawTheme );

import todoAppReducer from './reducers/todoAppReducer';
import TodoApp from './components/TodoApp.jsx';

// import { createStore } from 'redux';

// polyfill for createStore
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

// polyfill for Provider
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

// essential for the getChildContext feature to be turned on
Provider.childContextTypes = {
    store: React.PropTypes.object,
    muiTheme: React.PropTypes.object
};

ReactDOM.render(
    <Provider
        store={createStore(todoAppReducer)}
        muiTheme={MuiTheme}
    >
        <TodoApp />
    </Provider>,
    document.getElementsByClassName('todoapp')[0]
);

export default TodoApp;
