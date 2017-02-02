/**
 * Created by jack on 2016/10/19.
 */
import request, {fetchRequest} from '../../actions/common/request';
import {commonUpdateLoading, commonUpdateSnackBar} from '../Common/CommonAction';
import * as ActionTypes from './HomeActionTypes';
import Immutable from 'immutable';
import config from '../../config';
import _ from 'lodash';


const DEFAULT_POSITION = {
	lat: '31.666880',
	lng: '120.775410'
};


/**
 * mock轮播数据
 * @returns {*[]}
 */
function mockSliders() {
	const slider1 = {
		img: `${config.root_path}/public/img/slider.jpg`,
		url: `${config.root_path}/ShopMap`,
	};
	const slider2 = {
		img: `${config.root_path}/public/img/slider2.jpg`,
		url: `${config.root_path}/BuyFlowMap`,
	};

	return [
		slider2,
		slider1,
	].map(slider => feckSingleSlider(slider));
}


function feckSingleSlider(data) {
	const Id = Math.random();
	return {
		Id,
		...data
	};
}


export function homeGetInitData() {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'getHomeInitData'
		};
		request(fetchRequest(data)).then(rst => {
			if (rst.state == '1') {
				if (rst.data.sliders && rst.data.sliders.length == 0) {
					rst.data.sliders = mockSliders();
				}
				dispatch(homeUpdate(rst.data));
			} else {
				snackBar = { open: true, message: '发生错误' };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}

export function homeGetNearbyMd(lat, lng, cb) {
	lat = lat || '';
	lng = lng || '';
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		// 后台经纬度设计反了，前台处理
		const data = {
			handler: 'Event10',
			action: 'getNearbyMd',
			lng: lat,
			lat: lng
		};
		request(fetchRequest(data)).then(rst => {
			if (rst.state == '1') {
				const mds = Immutable.fromJS(rst.data.data);
				dispatch(homeUpdateMds(mds));
				if (typeof cb === 'function') {
					cb();
				}
			} else {
				snackBar = { open: true, message: '发生错误' };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


export function homeDoQiang(quan_id, md_id) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'doQiang',
			goods_id: quan_id,
			md_id
		};
		request(fetchRequest(data)).then(rst => {
			if (rst.state == '1') {
				// 抢到的优惠券信息 显示
				const quan = rst.data;
				dispatch(homeUpdateQuan(quan));
				dispatch(homeUpdateShowQuan(true));
			} else if (rst.state == '2') {
				// session过期 刷新页面
				window.location.href = `${config.root_path}/`;
				return false;
			} else if (rst.state == '3') {
				let info = '发生错误';
				if (_.has(rst, 'message') && rst.message) {
					info = rst.message;
				}
				snackBar = { open: true, message: info, autoHideDuration: 8000 };
				dispatch(commonUpdateSnackBar(snackBar));
			} else {
				snackBar = { open: true, message: '发生错误' };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}

export function homeUpdate(home) {
	return {
		type: ActionTypes.HOME_UPDATE,
		home
	};
}

export function homeUpdateMds(mds) {
	return {
		type: ActionTypes.HOME_UPDATE_MDS,
		mds
	}
}

export function homeUpdateQuan(quan) {
	return {
		type: ActionTypes.HOME_UPDATE_QUAN,
		quan
	}
}

export function homeUpdateShowQuan(showQuan) {
	return {
		type: ActionTypes.HOME_UPDATE_SHOW_QUAN,
		showQuan
	};
}

const homeAction = {
	homeGetInitData,
	homeUpdate,
	homeGetNearbyMd,
	homeUpdateMds,
	homeDoQiang,
	homeUpdateQuan,
	homeUpdateShowQuan,
};
export default homeAction;
