/**
 * bind state and action to component
 */
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
// import actions
import mainAction from './actions/mainAction';


// bind all the state to the wrappered component,
// or u can specified buy as u needed
const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        todos: state.todos,
        todosVisibility: state.todosVisibility
    };
};

// bind actions to props of the wrappered component
// or u can specified buy as u needed
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(mainAction, dispatch);
};

// do connect data to component props
const connectComponent = (module) => {
    return connect(mapStateToProps, mapDispatchToProps)(module);
};


export default connectComponent;