/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import styles from './UserCenterStyle';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import QuanList from '../Misc/QuanList';
import RouterMap from '../RouterMap';
import Immutable from 'immutable';
import _ from 'lodash';
import moment from 'moment';
import config from '../../config';
import RedirectButton from '../Misc/RedirectButton';
import TextField from 'material-ui/TextField';
import store from '../../store';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import userCenterActions from './UserCenterAction';
import commonActions from '../Common/CommonAction';
import TimeDownButton from '../Misc/TimeDownButton';
import AddressUserSelection from '../Misc/AddressUserSelection';


class WeiTuanOrderList extends Component {
	constructor(props) {
		super(props);
	}

	handleEditAddress = (order) => {
		// 修改地址
		const { t_id } = order;
		if (t_id == '1') {
			// const snackBar = {message: '预定商品，暂时无法修改地址', open: true};
			// store.dispatch(commonActions.commonUpdateSnackBar(snackBar));
			// return false;
			// 准备修改地址数据
			store.dispatch(userCenterActions.userCenterGetAddressUserList(order.wx_goods_id, (address_list) => {
				// 获取自提地址信息
				this.props.handleSetAddressState2(order, address_list);
			}));
		} else {
			// 获取sessionStorage中的全国地址
			let address_map = sessionStorage.getItem('address_map');
			if (address_map == undefined) {
				// 获取全国地址信息并存在sessionStorage中
				store.dispatch(userCenterActions.userCenterGetCommonAddress((address_map) => {
					sessionStorage.setItem('address_map', JSON.stringify(address_map));
					this.props.handleSetAddressState(order);
				}));
			} else {
				this.props.handleSetAddressState(order);
			}
		}
	};

	handlePay = (order_id) => {
		// 提交订单 跳转到微信支付接口，传递来源参数方便回调跳转
		window.location.href = `/ytj/phone/wzf/example/event_wx_order.php?order_id=${order_id}&source=event10`;
		return false;
	};

	handleShowWuliu = (order) => {
		const ship_url = `https://m.kuaidi100.com/result.jsp?com=${order.ship_id}&nu=${order.ship_no}`;
		window.location.href = ship_url;
		return false;
	};

	handleShouPickup = (order) => {
		this.props.handleSetOrderState(order);
	};

	shouldComponentUpdate(np) {
		if (np.orders.equals(this.props.orders)) {
			return false;
		}
		return true;
	}

	cartItemRender = (cart) => {
		const {name, price, num, image} = cart;
		const img_path = `http://csckl.com/uploadfiles/wxpic/${image}`;
		return (
			<div>
				<div style={styles.orderMainLeft}>
					<img style={styles.orderImg} src={img_path}/>
					<div style={styles.orderName}>{name}</div>
				</div>
				<div style={styles.orderMainRight}>
					<div style={styles.orderPrice}>￥{price}</div>
					<div style={styles.orderNum}>x{num}</div>
				</div>
			</div>
		);
	};


	render() {
		let { orders } = this.props;
		orders = orders.toJS();
		const isEmpty = orders.length > 0 ? false : true;
		let orderListHtml = orders.map((order, idx) => {
			let hideEditAddress = true;
			let hidePay = true;
			let hideWuliu = true;
			let hidePickUp = true; // 显示提货按钮
			// 状态
			let stateStr = '';
			if (order.state == '0') {
				stateStr = '未付款';
				// TODO 开启修改地址，付款功能
				hideEditAddress = false;
				hidePay = false;
			} else if (order.state == '1') {
				stateStr = '已付款';
				if (order.t_id == '1') {
					hidePickUp = false;
				}
			} else if (order.state == '2') {
				stateStr = '已清关';
			} else if (order.state == '3') {
				stateStr = '已发货';
				hideWuliu = false;
			} else if (order.state == '4') {
				stateStr = '交易成功';
			} else if (order.state == '5') {
				stateStr = '已作废';
			}
			let showAddressAction = {};
			if (hideEditAddress) {
				showAddressAction = { display: 'none' };
			}
			let showPayAction = { marginLeft: '.5rem' };
			if (hidePay) {
				showPayAction[ 'display' ] = 'none';
			}
			let showWuliuAction = { marginLeft: '.5rem' };
			if (hideWuliu) {
				showWuliuAction[ 'display' ] = 'none';
			}
			let showPickUpAction = {};
			if (hidePickUp) {
				showPickUpAction[ 'display' ] = 'none';
			}
			const address = `${order.consignee_province}${order.consignee_city}${order.consigneeD_dstrict}${order.consignee_address}`;
			const cartItemtml = order.car_list.map((cart, idx_) => {
				return (
					<div key={idx_}>
						{
							this.cartItemRender(cart)
						}
					</div>
				);
			});
			return (
				<div style={styles.orderWrapper} key={idx}>
					<div style={styles.orderInner}>
						<div style={styles.orderNo}>
							<span>{order.no}</span>
							<span>{stateStr}</span>
						</div>
						<div style={styles.orderMain}>
							{cartItemtml}
						</div>
						<div style={styles.weituanOrderConsignee}>
							<div style={{fontSize: '1.5rem', fontWeight: '600', width: '20%'}}>收件人：</div>
							<div style={{width: '80%', overflow: 'hidden'}}>{`${order.consignee_name}/${order.consignee_mobile}`}</div>
						</div>
						<div style={styles.weituanOrderAddress}>
							<div style={{fontSize: '1.5rem', fontWeight: '600',  width: '20%'}}>地址：</div>
							<div style={{width: '80%', overflow: 'hidden'}}>{address}</div>
						</div>
						<div style={styles.weituanOrderListTotal}>
							<div style={{fontSize: '2rem', fontWeight: '600'}}><span>合计:</span><span style={{color: styles.red}}>￥{order.money}</span></div>
							<div>
								<RaisedButton secondary={true} style={showAddressAction} label="修改" onClick={this.handleEditAddress.bind(this, order)}/>
								<RaisedButton secondary={true} style={showPayAction} label="付款" onClick={this.handlePay.bind(this, order.Id)}/>
								<RaisedButton secondary={true} style={showWuliuAction} label="物流" onClick={this.handleShowWuliu.bind(this, order)}/>
								<RaisedButton secondary={true} style={showPickUpAction} label="提货" onClick={this.handleShouPickup.bind(this, order)}/>
							</div>
						</div>
					</div>
				</div>

			);
		});
		
		if (isEmpty) {
			orderListHtml = (<div>
				<h2 style={{textAlign: 'center', color: 'gray'}}>暂无信息</h2>
			</div>);
		}

		return (
			<div data-name="order_list">
				{orderListHtml}
			</div>
		);
	}
}

WeiTuanOrderList.propTypes = {
	orders: React.PropTypes.instanceOf(Immutable.List).isRequired,
	handleSetAddressState: React.PropTypes.func.isRequired,
};


export default WeiTuanOrderList;