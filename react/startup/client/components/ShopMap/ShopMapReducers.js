import Immutable from 'immutable';
import * as ActionTypes from './ShopMapActionTypes';


function shopMap(state = {}, action = {}) {
	switch (action.type) {
		case ActionTypes.SHOP_MAP_UPDATE_MDS:
			let { mds } = action;
			mds = Immutable.fromJS(mds);
			return state.set('mds', mds);

		default:
			return state;
	}
}


export default shopMap;