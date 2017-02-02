/**
 * Created by jack on 2016/10/19.
 */
import request, {fetchRequest} from '../../actions/common/request';
import * as MockApi from '../../api/UserCenter/MockApi';
import {commonUpdateLoading, commonUpdateSnackBar} from '../Common/CommonAction';
import * as ActionTypes from './UserCenterActionTypes';
import _ from 'lodash';


export function userCenterGetInitData() {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'getUserCenterInitData',
		};
		const req1 = request(fetchRequest(data));

		const data2 = {
			handler: 'Event10',
			action: 'getMdList'
		};
		const req2 = request(fetchRequest(data2));
		Promise.all([ req1, req2 ]).then((rst) => {
			const [rst1, rst2] = rst;
			if (rst1.state == 1 && rst2.state == 1) {
				const userCenter = rst1.data;
				const mds = rst2.data.data;
				userCenter.mds = mds;
				dispatch(userCenterUpdate(userCenter));
			} else if (rst1.state == 2 || rst2.state == 2) {
				// session过期 刷新页面
				window.location.href = `${config.root_path}/`;
				return false;
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


export function userCenterUpdate(userCenter) {
	return {
		type: ActionTypes.USER_CENTER_UPDATE,
		userCenter
	};
}

export function userCenterStoreUpdateWeituanAddress(update_order) {
	return {
		type: ActionTypes.USER_CENTER_STORE_UPDATE_WEITUAN_ADDRESS,
		update_order
	};
}


export function userCenterUpdateTel(tel, msgCode, cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'updateUserTel',
			tel,
			code: msgCode
		}
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				snackBar = { open: true, message: '更新成功' };
				dispatch(commonUpdateSnackBar(snackBar));
				// 重新加载个人中心初始化信息
				dispatch(userCenterGetInitData());
				// 调用回调
				if (typeof cb == 'function') {
					cb();
				}
			} else {
				let msg = '发生错误';
				if (_.has(rst, 'message') && rst.message != '') {
					msg = rst.message;
				}
				snackBar = { open: true, message: msg };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


/**
 * 获取全国地址信息
 * @param cb
 * @returns {function()}
 */
export function userCenterGetCommonAddress(cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'getCommonAddress',
		}
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				if (typeof cb == 'function') {
					cb(rst.data);
				}
			} else {
				let msg = '发生错误';
				if (_.has(rst, 'message') && rst.message != '') {
					msg = rst.message;
				}
				snackBar = { open: true, message: msg };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


/**
 * 更新微团订单地址信息
 * @param cb
 * @returns {function()}
 */
export function userCenterUpdateWeituanAddress(address_info, cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'updateWeituanAddress',
			...address_info
		};
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				if (typeof cb == 'function') {
					cb();
				}
			} else {
				let msg = '发生错误';
				if (_.has(rst, 'message') && rst.message != '') {
					msg = rst.message;
				}
				snackBar = { open: true, message: msg };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


/**
 * 发送验证短信
 * @param cb
 * @returns {function()}
 */
export function userCenterSendMsgCode(tel, cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event10',
			action: 'sendMsgCode',
			tel
		}
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				// 短信发送成功
				if (typeof cb == 'function') {
					cb();
				}
			} else {
				let msg = '发生错误';
				if (_.has(rst, 'message') && rst.message != '') {
					msg = rst.message;
				}
				snackBar = { open: true, message: msg };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}

// 获取用户订单商品的指定收货地址信息
export function userCenterGetAddressUserList(goods_id, cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event09',
			action: 'getAddressUser',
			goods_id
		};
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				// 获取商品指定自提点地址列表
				if (typeof cb == 'function') {
					cb(rst.data);
				}
			} else {
				let msg = '发生错误';
				if (_.has(rst, 'message') && rst.message != '') {
					msg = rst.message;
				}
				snackBar = { open: true, message: msg };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}

export function userCenterUpdateOrderState(order_id, pass, cb) {
	return (dispatch) => {
		let snackBar;
		dispatch(commonUpdateLoading(true));
		const data = {
			handler: 'Event09',
			action: 'updateOrderState',
			order_id,
			pass
		};
		request(fetchRequest(data)).then((rst) => {
			if (rst.state == 1) {
				if (typeof cb === 'function') {
					cb();
				};
				snackBar = { open: true, message: rst.message , autoHideDuration: 8000};
				dispatch(commonUpdateSnackBar(snackBar));
			} else if (rst.state == 2) {
				// session过期 刷新页面
				window.location.href = `${config.root_path}/UserCenter`;
				return false;
			} else {
				let message = '发生错误';
				if (rst.message && rst.message != '') {
					message = rst.message;
				}
				snackBar = { open: true, message };
				dispatch(commonUpdateSnackBar(snackBar));
			}
			dispatch(commonUpdateLoading(false));
		}).catch(err => {
			dispatch(commonUpdateLoading(false));
		});
	};
}


export function userCenterStoreUpdateOrderState(order_id) {
	return {
		type: ActionTypes.USER_CENTER_STORE_UPDATE_ORDER_STATE,
		order_id
	};
}



const userCenterAction = {
	userCenterGetInitData,
	userCenterUpdate,
	userCenterUpdateTel,
	userCenterGetCommonAddress,
	userCenterUpdateWeituanAddress,
	userCenterStoreUpdateWeituanAddress,
	userCenterSendMsgCode,
	userCenterGetAddressUserList,
	userCenterUpdateOrderState,
	userCenterStoreUpdateOrderState
};
export default userCenterAction;
