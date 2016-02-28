/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, ReactDOM */

import Utils from '../helpers/utils.js';
import actions from '../actions';
import constants from '../constants';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';

class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(currentFilter, event){
        event.preventDefault();
        this.store.dispatch({
            type: actions.types.SET_VISIBILITY_FILTER,
            payload: {
                filter: currentFilter
            }
        })
    }

    onClearCompleted(event) {
        event.preventDefault();
        this.store.dispatch({
            type: actions.types.CLEAR_COMPLETED
        })
    }

    render(){
        let {count, completedCount} = this.props;
        const { store } = this.context;
        this.store = store;
        const state = store.getState();
        let activeTodoWord = Utils.pluralize(count, 'item');

        return (
            <footer>
                <Toolbar>
                    <ToolbarGroup float="left" >
                        <ToolbarTitle text={count + ' ' + activeTodoWord + ' left'}/>
                    </ToolbarGroup>

                    <ToolbarGroup style={{}}>
                        <FlatButton
                            disabled={constants.filters.SHOW_ALL === state.visibilityFilter}
                            label="All"
                            primary={true}
                            linkButton={true}
                            href="#/"
                            onClick={this.onClick.bind(this, constants.filters.SHOW_ALL)}
                            >
                        </FlatButton>
                        <ToolbarSeparator />

                        <FlatButton
                            disabled={constants.filters.SHOW_ACTIVE === state.visibilityFilter}
                            label="Active" secondary={true}
                            linkButton={true}
                            href="#/active"
                            onClick={this.onClick.bind(this, constants.filters.SHOW_ACTIVE)}
                            >
                        </FlatButton>

                        <ToolbarSeparator />

                        <FlatButton
                            disabled={constants.filters.SHOW_COMPLETED === state.visibilityFilter}
                            label="Completed"
                            linkButton={true}
                            href="#/completed"
                            onClick={this.onClick.bind(this, constants.filters.SHOW_COMPLETED)}
                            >
                        </FlatButton>

                    </ToolbarGroup>

                    <ToolbarGroup float="right"
                        style={{
                            display: completedCount ?
                                'initial' :
                                'none'
                        }}>
                        <FlatButton
                            label="Clear completed"
                            onClick={this.onClearCompleted.bind(this)}>
                        </FlatButton>
                    </ToolbarGroup>
                </Toolbar>
                
            </footer>
        )
    }
}

TodoFooter.contextTypes = {
    store: React.PropTypes.object
};

export default TodoFooter;