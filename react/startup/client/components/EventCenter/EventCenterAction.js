/**
 * Created by jack on 2016/10/19.
 */
import request, {fetchRequest} from '../../actions/common/request';
import * as MockApi from '../../api/EventCenter/MockApi';
import { commonUpdateLoading, commonUpdateSnackBar } from '../Common/CommonAction';
import * as ActionTypes from './EventCenterActionTypes';


export function eventCenterGetInitData() {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'getEventInitData'
		};
		// request(MockApi.getEventInitData()).then((rst) => {
		request(fetchRequest(data)).then((rst) => {
			const { state, data } = rst;
			if (state == '1') {
				dispatch(eventCenterUpdate(data));
			} else {
				snackBar = {open: true, message: '发生错误'};
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch((err) => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


export function eventCenterUpdate(eventCenter) {
	return {
		type: ActionTypes.EVENT_CENTER_UPDATE,
		eventCenter
	};
}


const eventCenterAction = {
	eventCenterGetInitData,
	eventCenterUpdate
};
export default eventCenterAction;
