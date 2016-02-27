/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */

import Utils from './utils.js';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FlatButton from 'material-ui/lib/flat-button';





// var TodoFooter = React.createClass({
//     render: function () {
//         var activeTodoWord = Utils.pluralize(this.props.count, 'item');
//         var clearButton = null;

//         if (this.props.completedCount > 0) {
//             clearButton = (
//                 <FlatButton
//                     label="Clear completed"
//                     className="clear-completed"
//                     onClick={this.props.onClearCompleted}>
                    
//                 </FlatButton>
//             );
//         }

//         var nowShowing = this.props.nowShowing;
//         return (
//             <footer className="footer">
//                 <span className="todo-count">
//                     <strong></strong> 
//                 </span>
//                 <Toolbar className="filters">
//                     <ToolbarGroup float="left" >
//                         <ToolbarTitle text={this.props.count + ' ' + activeTodoWord + ' left'}/>
//                     </ToolbarGroup>

//                     <ToolbarGroup style={{}}>
                        
//                         <FlatButton
//                             label="All" primary={true}
//                             linkButton={true}
//                             href="#/"
//                             className={classNames({selected: nowShowing === app.ALL_TODOS})}>
//                         </FlatButton>
//                         <ToolbarSeparator />
//                         <FlatButton
//                             label="Active" secondary={true}
//                             linkButton={true}
//                             href="#/active"
//                             className={classNames({selected: nowShowing === app.ACTIVE_TODOS})}>
//                         </FlatButton>
//                         <ToolbarSeparator />
//                         <FlatButton
//                             label="Completed"
//                             linkButton={true}
//                             href="#/completed"
//                             className={classNames({selected: nowShowing === app.COMPLETED_TODOS})}>
//                         </FlatButton>

//                     </ToolbarGroup>

//                     <ToolbarGroup float="right" >
//                         {clearButton}
//                     </ToolbarGroup>
//                 </Toolbar>
                
//             </footer>
//         );
//     }
// });

export default TodoFooter;