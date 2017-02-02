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
import store, {history} from '../../store';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import userCenterActions from './UserCenterAction';
import commonActions from '../Common/CommonAction';
import TimeDownButton from '../Misc/TimeDownButton';
import AddressUserSelection from '../Misc/AddressUserSelection';
import WeiTuanWrapper from './WeiTuanWrapper';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';


// 选择主菜单对应的值
const MAIN_TAB_MAP = {
	QUAN: 'QUAN',
	WEITUAN: 'WEITUAN'
};

// 选择券分类菜单对应的值
const QUAN_TAB_MAP = {
	UNUSED: 'UNUSED', // 未使用
	USED: 'USED', // 已使用
	ALL: 'ALL', // 全部
};


class UserCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '个人中心',
			mainTab: MAIN_TAB_MAP.WEITUAN,

			openBindTelDialog: false, // 显示绑定手机显示框
			tel: '', //  对话框中修改的手机号码
			msgCode: '', // 短信验证码
		};
	}

	// 选择主菜单
	handleMainTabChange = (value) => {
		// TODO(yuan.wu) 修改微团订单姓名会触发此方法，value还是错误的，暂时这样处理
		if (typeof value == 'string') {
			this.setState({
				mainTab: value
			});
		}
	};

	componentWillMount() {
		document.title = this.state.title;
	}

	componentDidMount() {
		document.title = this.state.title;
		// 获取用户信息
		this.props.userCenterGetInitData();
	}

	componentWillUnmount() {
	}

	componentDidUpdate() {
		document.title = this.state.title;
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { userCenter } = nextProps;
		const { mainTab, openBindTelDialog, tel } = nextState;
		if (userCenter.equals(this.props.userCenter) &&
			Immutable.fromJS(nextState).equals(Immutable.fromJS(this.state))
		) {
			return false;
		}
		return true;
	}

	handleShowBindDialog = () => {
		let { userCenter } = this.props;
		userCenter = userCenter.toJS();
		if (_.has(userCenter, 'tel') && userCenter.tel != '' && userCenter.tel != null) {
			return false;
		}

		this.setState({
			openBindTelDialog: true,
		});
	};

	handleCloseTelDialog = () => {
		this.setState({
			openBindTelDialog: false
		});
	};

	handleUpdateTel = () => {
		let { tel, msgCode } = this.state;
		tel = _.trim(tel);
		const reg1 = /^1[34578]\d{9}$/;
		if (!reg1.test(tel)) {
			const snackBar = { open: true, message: '手机号码不正确' };
			store.dispatch(this.props.commonUpdateSnackBar(snackBar));
			return false;
		}
		this.props.userCenterUpdateTel(tel, msgCode, () => {
			this.setState({
				openBindTelDialog: false,
			});
		});
	};

	handleTelInputChange = (event, val) => {
		this.setState({
			tel: _.trim(val)
		});
	};
	handleMsgCodeInputChange = (event, val) => {
		this.setState({
			msgCode: _.trim(val)
		});
	}

	handleSendMsg = (cb) => {
		const { tel } = this.state;
		const reg = /^1[34578]\d{9}$/;
		if (!reg.test(tel)) {
			const snackBar = { open: true, message: '手机号码不正确' };
			store.dispatch(commonActions.commonUpdateSnackBar(snackBar));
			return false;
		}
		store.dispatch(userCenterActions.userCenterSendMsgCode(tel, cb));
	};


	render() {
		let { userCenter } = this.props;
		const quans = userCenter.get('quans') || Immutable.fromJS([]);
		const orders = userCenter.get('orders') || Immutable.fromJS([]);
		const mds = userCenter.get('mds') || Immutable.fromJS([]);
		// 我有手机号码，为了测试删除我的手机号码
		// userCenter = userCenter.delete('tel').toJS();
		userCenter = userCenter.toJS();

		let bindTelText = '绑定手机';
		let userBindBtnStyle = styles.userBindBtn;
		if (_.has(userCenter, 'tel') && userCenter.tel != '' && userCenter.tel != null) {
			bindTelText = userCenter.tel;
		}

		const telDialogActions = [
			<RaisedButton
				style={{marginLeft: '.5rem'}}
				label="绑定"
				secondary={true}
				onTouchTap={this.handleUpdateTel}
			/>,
			<RaisedButton
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseTelDialog}
			/>,
		];

		let { mainTab } = this.state;
		// if (typeof this.state.mainTab != 'string') {
		// 	mainTab = MAIN_TAB_MAP.QUAN;
		// }
		let tabQuanStyle = styles.mainTab;
		let tabWeituanStyle = styles.mainTab;
		if (this.state.mainTab == MAIN_TAB_MAP.QUAN) {
			tabQuanStyle = { ...tabQuanStyle, ...styles.mainTabSelected };
		}
		if (this.state.mainTab == MAIN_TAB_MAP.WEITUAN) {
			tabWeituanStyle = { ...tabWeituanStyle, ...styles.mainTabSelected };
		}


		return (
			<div style={styles.userCenterWrapper}>
				<div style={styles.backStyle}>
					<IconButton onClick={() => {history.goBack();}}>
						<HardwareKeyboardArrowLeft/>
					</IconButton>后退
				</div>
				<div style={styles.userInfoWrapper}>
					<span style={styles.userAvatarWrapper}>
						<img style={styles.userAvatar} src={userCenter.avatar}/>
						<span style={styles.userName}>{userCenter.name}</span>
					</span>
					<span style={userBindBtnStyle} onClick={this.handleShowBindDialog}>{bindTelText}</span>
				</div>

				<div style={styles.userScoreWrapper}>
						<span style={styles.userScore}>
							<div style={styles.userScoreUp}>{userCenter.avaiable_quan}</div>
							<div style={styles.userScoreDown}>门店券数</div>
						</span>
						<span style={{...styles.userScore, ...styles.userScoreLine}}>
							<div style={styles.userScoreUp}>{userCenter.avaiable_weituan}</div>
							<div style={styles.userScoreDown}>参加微团</div>
						</span>
						<span style={styles.userScore}>
							<div style={styles.userScoreUp}>{userCenter.balance}元</div>
							<div style={styles.userScoreDown}>家易乐余额</div>
						</span>
				</div>

				<Tabs
					value={mainTab}
					onChange={this.handleMainTabChange}
					style={{marginTop: '.5rem'}}
					tabItemContainerStyle={{background: '#ffffff'}}
					inkBarStyle={styles.mainTabAction}
				>
					<Tab label="门店优惠券" value={MAIN_TAB_MAP.QUAN} style={tabQuanStyle}>
						<QuanWrapper quans={quans} mds={mds}/>
					</Tab>
					<Tab label="我的微团" value={MAIN_TAB_MAP.WEITUAN} style={tabWeituanStyle}>
						<WeiTuanWrapper orders={orders} userCenter={this.props.userCenter}/>
					</Tab>
				</Tabs>

				<RedirectButton name="首页" path="/Home"/>

				<Dialog
					title='绑定手机号码'
					actions={telDialogActions}
					open={this.state.openBindTelDialog}
					style={{top: '-50px'}}
				>
					<span style={{color: 'green'}}>绑定家易乐注册手机号码可以查看家易乐余额哦~</span>
					<TextField
						hintText="手机号码"
						style={{width: '100%'}}
						value={this.state.tel}
						onChange={this.handleTelInputChange}
					/>
					<TextField
						hintText="短信验证码"
						value={this.state.msgCode}
						onChange={this.handleMsgCodeInputChange}
						style={{width: '50%', marginRight: '1rem'}}
					/>
					<TimeDownButton handleClick={this.handleSendMsg}/>
				</Dialog>
			</div>
		);
	}
}


class QuanWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: QUAN_TAB_MAP.UNUSED,
			release_tab: false, // 确保第一次获取数据后更新默认选项，然后禁用，后续用户操作不会被自动设置标签

			showQuan: false,
			quan: {},
		};
	}

	handleTabChange = (value) => {
		this.setState({
			tab: value
		});
	}

	/**
	 * 点击优惠券兑换
	 * @param quan 优惠券信息
	 * @param quanIsAvaiable 此优惠券是否有效可兑换
	 */
	handleDuiHuan(quan, quanIsAvaiable) {
		if (!quanIsAvaiable) {
			return false;
		}
		// 显示兑换优惠券
		this.setState({
			showQuan: true,
			quan
		});
	}

	/**
	 *  获取券的状态数量
	 * @param quans 券列表
	 * @returns {array} [未使用数量, 使用数量, 全部]
	 */
	getQuanStateCount(quans) {
		/**
		 * quan.state: 0: 未使用 1: 已使用
		 */
		const today = moment().format('YYYY-MM-DD');
		let unusedCount = 0;
		let usedCount = 0;
		let allCount = 0;
		quans.toJS().map(quan => {
			if (quan.state == '0') {
				if (today >= quan.s_date && today <= quan.e_date) {
					unusedCount++;
				}
			} else if (quan.state == '1') {
				usedCount++;
			}
			allCount++;
		});
		return [ unusedCount, usedCount, allCount ];
	}

	/**
	 * 过滤出用户选择状态的有效的券列表
	 * @param{Immutable.List} quans 券列表
	 * @param tab_name 用户点击的券分类
	 * @returns {Immutable.List}
	 */
	filterQuan(quans, tab_name) {
		/**
		 * quan.state: 0: 未使用, 1: 已使用
		 */
		const today = moment().format('YYYY-MM-DD');
		let new_quans = quans.toJS().map(quan => {
			if (tab_name == QUAN_TAB_MAP.UNUSED && quan.state == '0') {
				// 判断券是否过期
				if (today >= quan.s_date && today <= quan.e_date) {
					return quan;
				}
			} else if (tab_name == QUAN_TAB_MAP.USED && quan.state == '1') {
				return quan;
			} else if (tab_name == QUAN_TAB_MAP.ALL) {
				return quan;
			}
		});
		new_quans = _.compact(new_quans);
		return Immutable.fromJS(new_quans);
	}

	/**
	 *
	 * @param Id
	 * @returns {string}
	 */
	getMdNameById = (Id) => {
		if (Id == undefined) {
			return '';
		}

		let { mds } = this.props;
		mds = mds.toJS();
		const selectedMd = _.find(mds, md => {
			return md.Id == Id;
		});

		return selectedMd.name || '';
	};

	handleCloseQuan = () => {
		this.setState({
			showQuan: false
		});
	};

	shouldComponentUpdate(np, ns) {
		if (this.props.quans.equals(np.quans) && this.state.tab === ns.tab && ns.showQuan == this.state.showQuan) {
			return false;
		}
		return true;
	}

	componentDidUpdate() {
		const { release_tab } = this.state;
		if (release_tab) {
			return;
		}
		const raw_quans = this.props.quans || Immutable.fromJS([]);
		// 计算券不同状态的数量，在tab上显示；以及过滤出当前选中的状态的券list
		const [unusedCount = 0, usedCount = 0, allCount = 0 ] = this.getQuanStateCount(raw_quans);
		const state = {
			tab: QUAN_TAB_MAP.ALL,
			release_tab: true
		};
		if (unusedCount > 0) {
			state.tab = QUAN_TAB_MAP.UNUSED
		}
		this.setState(state);
	}

	render() {
		const { tab, showQuan, quan } = this.state;
		const raw_quans = this.props.quans || Immutable.fromJS([]);
		// 计算券不同状态的数量，在tab上显示；以及过滤出当前选中的状态的券list
		const [unusedCount, usedCount, allCount ] = this.getQuanStateCount(raw_quans);
		const quans = this.filterQuan(raw_quans, tab);

		// 选中的tab设置字体颜色
		let unusedTabStyle = styles.quanTab;
		let usedTabStyle = styles.quanTab;
		let allTabStyle = styles.quanTab;
		if (tab === QUAN_TAB_MAP.UNUSED) {
			unusedTabStyle = { ...unusedTabStyle, ...{ color: styles.red } };
		} else if (tab === QUAN_TAB_MAP.USED) {
			usedTabStyle = { ...usedTabStyle, ...{ color: styles.red } };
		} else if (tab == QUAN_TAB_MAP.ALL) {
			allTabStyle = { ...allTabStyle, ...{ color: styles.red } };
		}


		const quanActions = [
			<RaisedButton
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseQuan}
			/>
		];

		const mdName = this.getMdNameById(quan.wx_ckl_md_id);

		return (
			<div>
				<Tabs
					value={this.state.tab}
					onChange={this.handleTabChange}
					tabItemContainerStyle={{background: '#ffffff'}}
					inkBarStyle={styles.quanTabAction}
				>
					<Tab label={`可用券(${unusedCount})`} value={QUAN_TAB_MAP.UNUSED} style={unusedTabStyle}/>
					<Tab label={`已使用(${usedCount})`} value={QUAN_TAB_MAP.USED} style={usedTabStyle}/>
					<Tab label={`全部券(${allCount})`} value={QUAN_TAB_MAP.ALL} style={allTabStyle}/>
				</Tabs>
				<QuanList quans={quans} origin={RouterMap.UserCenter} qiangFn={this.handleDuiHuan.bind(this)}/>
				<Dialog
					title={quan.quan_name}
					actions={quanActions}
					open={showQuan}
					onRequestClose={this.handleCloseQuan}
					style={{top: '-50px'}}
				>
					<div><span>只需扫码付款:</span><span style={{color: 'green', fontWeight: '600'}}>&nbsp;{quan.money}元</span></div>
					<div><span style={{fontSize: '1.5rem'}}>条码:&nbsp;{quan.quan_no}</span></div>
					<div style={{marginTop: '.5rem'}}>
						<img style={{width: '100%'}} src={`${config.root_path}/barcode/test.php?codebar=BCGcode128&text=${quan.quan_no}`}/>
					</div>
					<div style={{marginTop: '.5rem', textAlign: 'right'}}>
						<span style={{color: 'red'}}>适用门店：{mdName}</span>
					</div>
				</Dialog>
			</div>
		);
	}
}

QuanWrapper.propTypes = {
	quans: React.PropTypes.instanceOf(Immutable.List).isRequired,
};


export default UserCenter;