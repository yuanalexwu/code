/**
 * bind state and action to component
 */
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
// import actions
import mainAction from './actions/mainAction';


// bind state
const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        todos: state.todos
    };
};
// bind actions to props
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainAction, dispatch);
};
// connect data to component props
const connectComponent = (module) => {
    return connect(mapStateToProps, mapDispatchToProps)(module);
};


export default connectComponent;