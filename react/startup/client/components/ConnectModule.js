import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actionCreators from '../actions/actionCreators';


function mapStateToProps(state) {
	return {
		common: state.common,
		home: state.home,
		userCenter: state.userCenter,
		eventCenter: state.eventCenter,
		shopMap: state.shopMap,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		actionCreators,
		dispatch
	);
}

export default function ConnectModule(module) {
	return connect(mapStateToProps, mapDispatchToProps)(module);
}

