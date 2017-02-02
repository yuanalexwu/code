/**
 * Created by jack on 2016/10/19.
 */
import request, {fetchRequest} from '../../actions/common/request';
import { commonUpdateLoading, commonUpdateSnackBar } from '../Common/CommonAction';
import * as ActionTypes from './ShopMapActionTypes';


export function shopMapGetInitData() {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'getMdList'
		};
		request(fetchRequest(data)).then(rst => {
			if (rst.state == '1') {
				dispatch(shopMapUpdateMds(rst.data.data));
			} else {
				snackBar = {open: true, message: '发生错误'};
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


export function shopMapUpdateMds(mds) {
	return {
		type: ActionTypes.SHOP_MAP_UPDATE_MDS,
		mds
	};
}


const shopMapAction = {
	shopMapGetInitData,
	shopMapUpdateMds
};
export default shopMapAction;
