import Immutable from 'immutable';
import * as ActionTypes from './HomeActionTypes';


function home(state = {}, action = {}) {
	switch (action.type) {
		case ActionTypes.HOME_UPDATE:
			const { sliders, quans } = action.home;
			return state.set('sliders', Immutable.fromJS(sliders)).set('quans', Immutable.fromJS(quans));

		case ActionTypes.HOME_UPDATE_MDS:
			const { mds } = action;
			return state.set('mds', Immutable.fromJS(mds));

		case ActionTypes.HOME_UPDATE_QUAN:
			const { quan } = action;
			return state.set('quan', Immutable.fromJS(quan));

		case ActionTypes.HOME_UPDATE_SHOW_QUAN:
			const { showQuan } = action;
			return state.set('showQuan', showQuan);

		default:
			return state;
	}
}


export default home;