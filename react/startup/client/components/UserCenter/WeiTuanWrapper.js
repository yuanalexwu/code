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
import MyDialog from './MyDialog';
import WeiTuanOrderList from './WeiTuanOrderList';


// 选择微团分类菜单对应的值
const WEITUAN_TAB_MAP = {
	UNPAYED: 'UNPAYED', // 未付款
	UNDELIVERED: 'UNDELIVERED', // 未发货
	UNARRIVAL: 'UNARRIVAL', // 待收货
};


class WeiTuanWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: WEITUAN_TAB_MAP.UNPAYED,
			release_tab: false,

			openUpdateAddressDialog: false, // 显示修改地址
			openUpdateAddressDialog2: false, // 显示用户自提地址修改
			openUpdateOrderStateDialog: false, // 显示提货对话框

			Id: '', // 订单id
			consignee_name: '', // 收件人
			consignee_mobile: '', // 收件人手机
			consignee_province: '请选择省份', // 江苏省
			consignee_city: '请选择城市', // 苏州市
			consigneeD_dstrict: '请选择县市', // 常熟市
			consignee_address: '', // 详细地址

			address_list: [], // 用户自提地址列表

			pass: '', // 提货密码
		};
	}

	/**
	 * 此方法传递给子组件，用于回调
	 * 设置地址修改对话框中的地址信息
	 * @param order
	 */
	handleSetAddressState = (order) => {
		const {
			Id, consignee_name, consignee_mobile,
			consignee_province, consignee_city, consigneeD_dstrict,
			consignee_address,
		} = order;
		this.setState({
			openUpdateAddressDialog: true,
			Id, consignee_name, consignee_mobile,
			consignee_province, consignee_city, consigneeD_dstrict,
			consignee_address,
		});
	};

	/**
	 * 此方法传递给子组件，用于回调
	 * 设置地址修改对话框中的地址信息
	 * @param order
	 * @param address_list
	 */
	handleSetAddressState2 = (order, address_list) => {
		const {
			Id, consignee_name, consignee_mobile,
			consignee_address,
		} = order;
		this.setState({
			openUpdateAddressDialog2: true,
			Id, consignee_name, consignee_mobile,
			consignee_address,
			address_list,
		});
	};

	/**
	 * 此方法传递给子组件，用于回调
	 * 设置用户修改的提货验证
	 * @param order
	 */
	handleSetOrderState = (order) => {
		this.setState({
			openUpdateOrderStateDialog: true,
			Id: order.Id,
		});
	};

	/**
	 * 提交用户更新的地址信息
	 */
	handleUpdateAddress = () => {
		store.dispatch(userCenterActions.userCenterUpdateWeituanAddress(this.state, () => {
			// 关闭更新对话框
			this.setState({
				openUpdateAddressDialog: false,
			});

			// 更新store
			// window.location.href = `${config.root_path}/UserCenter`;
			// return false;
			store.dispatch(userCenterActions.userCenterStoreUpdateWeituanAddress(this.state));
		}));
	};

	/**
	 * 取消显示更新地址对话框
	 * @param value
	 */
	handleCloseUpdateAddress = (event) => {
		this.setState({
			openUpdateAddressDialog: false,
		});
		return false;
	};

	/**
	 * 提交用户提货信息
	 */
	handleUpdateOrderState = () => {
		let { Id, pass } = this.state;
		pass = _.trim(pass);
		let snackBar;
		if (Id == '' || pass == '') {
			snackBar = { open: true, message: '请填写正确的验证码' };
			store.dispatch(commonActions.commonUpdateSnackBar(snackBar));
			return false;
		}
		store.dispatch(userCenterActions.userCenterUpdateOrderState(Id, pass, () => {
			// 更新成功后回调修改订单的状态
			store.dispatch(userCenterActions.userCenterStoreUpdateOrderState(Id));
			// 关闭对话框
			this.setState({
				openUpdateOrderStateDialog: false,
				tab: WEITUAN_TAB_MAP.UNARRIVAL
			});
		}));
	};


	/**
	 * 取消显示更新地址对话框
	 * @param value
	 */
	handleCloseUpdateOrderState = (event) => {
		this.setState({
			openUpdateOrderStateDialog: false,
		});
		return false;
	};

	/**
	 * 用户输入事件
	 * @param value
	 */
	handleChangeOrderState = (type, event, value) => {
		const data = {};
		data[ type ] = value;
		this.setState(data);
	};


	/**
	 * 提交用户更新的地址信息
	 */
	handleUpdateAddress2 = () => {
		// 检查输入信息是否正确
		const selected_address = this.state;
		let { consignee_name, consignee_mobile, consignee_address } = selected_address;
		consignee_name = _.trim(consignee_name);
		consignee_mobile = _.trim(consignee_mobile);
		consignee_address = _.trim(consignee_address);
		if (
			consignee_name == '' || consignee_mobile == '' ||
			consignee_address == '' ||
			consignee_address == '请选择自提点' ||
			consignee_address.split('送货上门').length >= 2
		) {
			const snackBar = { message: '请输入正确地址信息', open: true };
			store.dispatch(commonActions.commonUpdateSnackBar(snackBar));
			return false;
		}
		const address_info = { ...this.state };
		address_info.consignee_province = '江苏省';
		address_info.consignee_city = '苏州市 ';
		address_info.consigneeD_dstrict = '常熟市';

		store.dispatch(userCenterActions.userCenterUpdateWeituanAddress(address_info, () => {
			// 关闭更新对话框
			this.setState({
				openUpdateAddressDialog2: false,
			});

			// 更新store
			store.dispatch(userCenterActions.userCenterStoreUpdateWeituanAddress(address_info));
		}));
	};

	/**
	 * 取消显示更新地址对话框
	 * @param value
	 */
	handleCloseUpdateAddress2 = (event) => {
		this.setState({
			openUpdateAddressDialog2: false,
		});
		return false;
	};

	/**
	 * 更新用户修改的自提地址信息
	 * @param state
	 */
	handleUpdateProps = (state) => {
		this.setState(state);
	}

	/**
	 * 用户输入事件
	 * @param value
	 */
	handleAddressChange = (type, event, value) => {
		const data = {};
		data[ type ] = value;
		this.setState(data);
	};

	/**
	 * 更新省份
	 */
	handleChangeProvince = (event, id, value) => {
		this.setState({
			consignee_province: value,
			consignee_city: '请选择城市',
			consigneeD_dstrict: '请选择县市',
		});
	};

	/**
	 * 更新城市
	 */
	handleChangeCity = (event, id, value) => {
		this.setState({
			consignee_city: value,
			consigneeD_dstrict: '请选择县市',
		});
	};

	/**
	 * 更新县市
	 */
	handleChangeDstrict = (event, id, value) => {
		this.setState({
			consigneeD_dstrict: value,
		});
	};

	/**
	 * 省份 select render
	 */
	provinceRender = () => {
		let out = [];
		const default_item = <MenuItem key="-1" value="请选择省份" primaryText="请选择省份"/>;
		let address_map = sessionStorage.getItem('address_map');
		if (address_map == undefined) {
			out.push(default_item);
			return out;
		}

		address_map = JSON.parse(address_map);
		const { provinces, citys, countys } = address_map;
		provinces.map((province) => {
			out.push(<MenuItem key={province.id} value={province.value} primaryText={province.value}/>);
		});
		out = _.concat(default_item, out);
		return out;
	};


	/**
	 * 城市 select render
	 */
	cityRender = () => {
		let out = [];
		const default_item = <MenuItem key="-1" value="请选择城市" primaryText="请选择城市"/>;
		let address_map = sessionStorage.getItem('address_map');
		if (address_map == undefined) {
			out.push(default_item);
			return out;
		}
		address_map = JSON.parse(address_map);
		const { provinces, citys, countys } = address_map;
		const { consignee_province } = this.state;
		let province_id;
		provinces.map((province) => {
			if (province.value == consignee_province) {
				province_id = province.id;
			}
		});

		if (province_id == undefined) {
			out.push(default_item);
			return out;
		}

		citys.map((city) => {
			if (city.parentId == province_id) {
				out.push(<MenuItem key={city.id} value={city.value} primaryText={city.value}/>);
			}
		});
		out = _.concat(default_item, out);
		return out;
	};

	/**
	 * 县市 select render
	 */
	districtRender = () => {
		let out = [];
		const default_item = <MenuItem key="-1" value="请选择县市" primaryText="请选择县市 "/>;
		let address_map = sessionStorage.getItem('address_map');
		if (address_map == undefined) {
			out.push(default_item);
			return out;
		}
		address_map = JSON.parse(address_map);
		const { provinces, citys, countys } = address_map;
		const { consignee_city } = this.state;
		let city_id;
		citys.map((city) => {
			if (city.value == consignee_city) {
				city_id = city.id;
			}
		});

		if (city_id == undefined) {
			out.push(default_item);
			return out;
		}

		countys.map((county) => {
			if (county.parentId == city_id) {
				out.push(<MenuItem key={county.id} value={county.value} primaryText={county.value}/>);
			}
		});
		out = _.concat(default_item, out);
		return out;
	};

	handleTabChange = (value) => {
		this.setState({
			tab: value
		});
	};

	/**
	 * 根据用户选中的订单显示类型过滤出对应的订单
	 * @param orders{Immutable.List} 订单列表
	 * @param tab{String} 用户选中的显示类型
	 * @returns {Immutable.List}
	 */
	filterOrders(orders, tab) {
		orders = orders.toJS();
		let new_orders = orders.map(order => {
			if (tab == WEITUAN_TAB_MAP.UNPAYED && order.state == '0') {
				return order;
			} else if (tab == WEITUAN_TAB_MAP.UNDELIVERED && order.state == '1') {
				return order;
			} else if (tab == WEITUAN_TAB_MAP.UNARRIVAL && ( order.state == '3' || order.state == '4')) {
				return order;
			}
		});
		new_orders = _.compact(new_orders);
		return Immutable.fromJS(new_orders);
	}

	shouldComponentUpdate(np, ns) {
		if (np.orders.equals(this.props.orders) && Immutable.fromJS(this.state).equals(Immutable.fromJS(ns))) {
			return false;
		}
		return true;
	}

	getWeituanStateCount = (orders = []) => {
		let unpayedCount = 0;
		let undeliveredCount = 0;
		let unarrivalCount = 0;
		orders.map((order) => {
			const { state } = order;
			if (state == '0') {
				unpayedCount++;
			} else if (state == '1') {
				undeliveredCount++;
			} else if (state == '3' || state == '4') {
				unarrivalCount++;
			}
		});
		return [ unpayedCount, undeliveredCount, unarrivalCount ];
	};

	componentDidUpdate() {
		const { release_tab } = this.state;
		if (release_tab) {
			return;
		}

		let orders = this.props.orders || Immutable.fromJS([]);
		// 计算微团订单状态的数量
		const [unpayedCount = 0, undeliveredCount = 0, unarrivalCount = 0] = this.getWeituanStateCount(orders.toJS());
		const state = {
			release_tab: true,
			tab: WEITUAN_TAB_MAP.UNARRIVAL
		};
		if (unpayedCount > 0) {
			state.tab = WEITUAN_TAB_MAP.UNPAYED
		} else if (undeliveredCount > 0) {
			state.tab = WEITUAN_TAB_MAP.UNDELIVERED
		}
		this.setState(state);
	}


	render() {
		const { tab } = this.state;
		let orders = this.props.orders || Immutable.fromJS([]);

		// 选中的tab设置字体颜色
		let unpayedTabStyle = styles.weiTuanTab;
		let undeliveredTabStyle = styles.weiTuanTab;
		let unarrivalTabStyle = styles.weiTuanTab;
		if (tab === WEITUAN_TAB_MAP.UNPAYED) {
			unpayedTabStyle = { ...unpayedTabStyle, ...{ color: styles.red } };
		} else if (tab === WEITUAN_TAB_MAP.UNDELIVERED) {
			undeliveredTabStyle = { ...undeliveredTabStyle, ...{ color: styles.red } };
		} else if (tab == WEITUAN_TAB_MAP.UNARRIVAL) {
			unarrivalTabStyle = { ...unarrivalTabStyle, ...{ color: styles.red } };
		}

		// 计算微团订单状态的数量
		const [unpayedCount = 0, undeliveredCount = 0, unarrivalCount = 0] = this.getWeituanStateCount(orders.toJS());

		// 过滤选中状态的订单
		orders = this.filterOrders(orders, tab);

		const updateAddressDialogActions = [
			<RaisedButton
				key="1"
				style={{marginLeft: '.5rem'}}
				label="保存"
				secondary={true}
				onTouchTap={this.handleUpdateAddress}
			/>,
			<RaisedButton
				key="2"
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseUpdateAddress}
			/>,
		];

		const updateAddressDialogActions2 = [
			<RaisedButton
				key="1"
				style={{marginLeft: '.5rem'}}
				label="保存"
				secondary={true}
				onTouchTap={this.handleUpdateAddress2}
			/>,
			<RaisedButton
				key="2"
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseUpdateAddress2}
			/>,
		];

		const updateAddressDialogActions3 = [
			<RaisedButton
				key="1"
				style={{marginLeft: '.5rem'}}
				label="保存"
				secondary={true}
				onTouchTap={this.handleUpdateOrderState}
			/>,
			<RaisedButton
				key="2"
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseUpdateOrderState}
			/>,
		];

		let province_render = this.provinceRender();
		let city_render = this.cityRender();
		let district_render = this.districtRender();

		const { consignee_name, consignee_mobile, consignee_address } = this.state;
		const selectedAddress = {
			consignee_name,
			consignee_mobile,
			consignee_address,
		};

		return (
			<div>
				<Tabs
					value={this.state.tab}
					onChange={this.handleTabChange}
					tabItemContainerStyle={{background: '#ffffff'}}
					inkBarStyle={styles.weiTuanTabAction}
				>
					<Tab label={`待付款(${unpayedCount})`} value={WEITUAN_TAB_MAP.UNPAYED} style={unpayedTabStyle}/>
					<Tab label={`待发货(${undeliveredCount})`} value={WEITUAN_TAB_MAP.UNDELIVERED} style={undeliveredTabStyle}/>
					<Tab label={`已发货(${unarrivalCount})`} value={WEITUAN_TAB_MAP.UNARRIVAL} style={unarrivalTabStyle}/>
				</Tabs>

				<WeiTuanOrderList
					orders={orders}
					handleSetAddressState={this.handleSetAddressState}
					handleSetAddressState2={this.handleSetAddressState2}
					handleSetOrderState={this.handleSetOrderState}
				/>

				<MyDialog
					title='修改订单地址'
					actions={updateAddressDialogActions}
					open={this.state.openUpdateAddressDialog}
				>
					<TextField
						hintText="请填写收件人"
						floatingLabelText="收件人"
						style={{width: '100%'}}
						value={this.state.consignee_name}
						onChange={this.handleAddressChange.bind(this, 'consignee_name')}
					/>
					<TextField
						hintText="请填写手机号码"
						floatingLabelText="手机号码"
						style={{width: '100%'}}
						value={this.state.consignee_mobile}
						onChange={this.handleAddressChange.bind(this, 'consignee_mobile')}
					/>
					<TextField
						hintText="请填写详细地址"
						floatingLabelText="详细地址"
						style={{width: '100%'}}
						value={this.state.consignee_address}
						onChange={this.handleAddressChange.bind(this, 'consignee_address')}
					/>
					<SelectField fullWidth={true} value={this.state.consignee_province} onChange={this.handleChangeProvince}>
						{province_render}
					</SelectField>
					<SelectField fullWidth={true} value={this.state.consignee_city} onChange={this.handleChangeCity}>
						{city_render}
					</SelectField>
					<SelectField fullWidth={true} value={this.state.consigneeD_dstrict} onChange={this.handleChangeDstrict}>
						{district_render}
					</SelectField>
				</MyDialog>

				<MyDialog
					title="修改地址"
					actions={updateAddressDialogActions2}
					open={this.state.openUpdateAddressDialog2}
				>
					<AddressUserSelection
						addressList={this.state.address_list}
						selectedAddress={selectedAddress}
						handleUpdateProps={this.handleUpdateProps}
					/>
				</MyDialog>


				<MyDialog
					title='我要提货'
					actions={updateAddressDialogActions3}
					open={this.state.openUpdateOrderStateDialog}
				>
					<TextField
						hintText="请填写提货密码"
						floatingLabelText="提货密码"
						style={{width: '100%'}}
						value={this.state.pass}
						onChange={this.handleChangeOrderState.bind(this, 'pass')}
					/>
				</MyDialog>

			</div>
		);
	}
}

WeiTuanWrapper.propTypes = {
	orders: React.PropTypes.instanceOf(Immutable.List).isRequired,
	userCenter: React.PropTypes.instanceOf(Immutable.Map).isRequired,
};


export default WeiTuanWrapper;