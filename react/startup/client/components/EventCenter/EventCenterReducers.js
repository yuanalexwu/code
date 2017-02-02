import Immutable from 'immutable';
import * as ActionTypes from './EventCenterActionTypes';


function userCenter(state = {}, action = {}) {
	switch (action.type) {
		case ActionTypes.EVENT_CENTER_UPDATE:
			const { eventCenter } = action;
			return Immutable.fromJS(eventCenter);

		default:
			return state;
	}
}


export default userCenter;