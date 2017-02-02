import Immutable from 'immutable';
import * as ActionTypes from './UserCenterActionTypes';
import _ from 'lodash';


function userCenter(state = {}, action = {}) {
	switch (action.type) {
		case ActionTypes.USER_CENTER_UPDATE:
			const { userCenter } = action;
			return Immutable.fromJS(userCenter);
		
		case ActionTypes.USER_CENTER_STORE_UPDATE_WEITUAN_ADDRESS:
			const { update_order } = action;
			let data = state.toJS();
			let { orders } = data;
			let new_orders = orders.map((order) => {
				if (order.Id == update_order.Id) {
					Object.keys(order).map((key) => {
						if (_.has(update_order, key)) {
							order[key] = update_order[key];
						}
					});
				}
				return order;
			});
			data.orders = new_orders || [];
			return Immutable.fromJS(data);

		case ActionTypes.USER_CENTER_STORE_UPDATE_ORDER_STATE:
			const { order_id } = action;
			let data2 = state.toJS();
			let orders2 = data2.orders;
			let new_orders2 = orders2.map(order => {
				if (order.Id == order_id) {
					// 订单设置为交易成功
					order.state = 4;
				}
				return order;
			});
			data2.orders = new_orders2 || [];
			return Immutable.fromJS(data2);

		default:
			return state;
	}
}


export default userCenter;