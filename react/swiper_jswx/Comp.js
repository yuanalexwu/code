import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import config from '../../config';
import Util from '../../util/Util';
import styles from './HomeStyle';
import QuanList from '../Misc/QuanList';
import RouterMap from '../RouterMap';
import _ from 'lodash';
import Immutable from 'immutable';
import store from '../../store';
import {commonUpdateSnackBar, commonUpdateLoading} from '../Common/CommonAction';
import {homeUpdateShowQuan} from './HomeAction';
import RedirectButton from '../Misc/RedirectButton';
import moment from 'moment';


const LOCATION_SAVE_TIMEOUT = 60; // 保存用户的位置坐标时间 单位秒


class Comp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '微商品区',

			showMask: false,
			selectedMd: '0',
		}
	}

	// 初始化轮播Swiper
	initSwiper = () => {
		if (this.state.swiper != undefined) {
			return false;
		} 
		const swiper = new Swiper(
			'.swiper-container',
			{
				pagination: '.swiper-pagination',
				autoplayDisableOnInteraction: false,
				autoplay: 5000,
				loop: true,
			}
		);
		
		this.setState({
			swiper: swiper
		});
	};

	hanbdleInitSwiper = () => {
		if (window.Swiper === undefined) {
			const util = new Util();
			// swiper.js
			const jsPath = `${config.root_path}/public/js/swiper.min.js`;
			util.importJs(jsPath, () => {
				// js加载完成后操作
				// 初始化swiper 
				this.initSwiper();
			});
			// swiper.css
			const cssPath = `${config.root_path}/public/css/swiper.min.css`;
			util.importCss(cssPath);
		} else {
			// 已经加载直接初始化swiper 
			this.initSwiper();
		}
	};

	componentWillMount() {
		document.title = this.state.title;
	}

	componentDidMount() {
		document.title = this.state.title;
		// 首页加载初始化信息
		this.props.homeGetInitData();
	}

	componentDidUpdate() {
		document.title = this.state.title;
		// 首页初始化信息记载完成，props更新，此时初始化Swiper
		this.hanbdleInitSwiper();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { home } = this.props;
		if (home.equals(nextProps.home) &&
			this.state.showMask == nextState.showMask &&
			this.state.selectedMd == nextState.selectedMd
		) {
			return false;
		}
		return true;
	}

	handleSliderClick(url) {
		window.location.href = url;
		return false;
	}


	/**
	 * 调用微信接口获取用户当前坐标
	 */
	getCurrentWxLocation = (quan) => {
		store.dispatch(commonUpdateLoading(true));
		let latitude = '';
		let longitude = '';
		wx.getLocation({
			type: 'gcj02',
			success: (res) => {
				latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				// const speed = res.speed; // 速度，以米/每秒计
				// const accuracy = res.accuracy; // 位置精度
				sessionStorage.setItem('timestamp', moment().format('X'));
				sessionStorage.setItem('lat', latitude);
				sessionStorage.setItem('lng', longitude);
				this.props.homeGetNearbyMd(latitude, longitude, () => {
					// 回调保存券id到state，显示选择提货站点
					this.setState({
						quan_id: quan.Id,
						showMask: true
					});
				});
			},
			fail: (res) => {
				this.props.homeGetNearbyMd(latitude, longitude, () => {
					// 回调保存券id到state，显示选择提货站点
					this.setState({
						quan_id: quan.Id,
						showMask: true
					});
				});
			},
			cancel: (res) => {
				// 用户拒绝获取地理位置
				// 直接请求接口获取默认地址
				this.props.homeGetNearbyMd(latitude, longitude, () => {
					// 回调保存券id到state，显示选择提货站点
					this.setState({
						quan_id: quan.Id,
						showMask: true
					});
				});
				console.log(res);
			}
		});
	};


	/**
	 * 用户点券列表上的抢券
	 * @param quan 券信息
	 * @param notAvaiable 券是否无效
	 * @returns {boolean}
	 */
	handleQiang = (quan, quanIsAvaiable) => {
		let snackBar;
		if (!quanIsAvaiable) {
			// 需求只要能够看见的券都能抢
			snackBar = {open: true, message: '此券已经过期'};
			store.dispatch(commonUpdateSnackBar(snackBar));
			return false;
		}

		// 未获取微信jsapi接口
		if (window.wx == undefined) {
			const latitude = '';
			const longitude = '';
			this.props.homeGetNearbyMd(latitude, longitude, () => {
				this.setState({
					quan_id: quan.Id,
					showMask: true
				});
			});
			return false;
		}

		/**
		 * sessionStorage map
		 * 第一次获取缓存时间戳
		 * 第二次获取判断时间戳是否大于给定时间
		 * 小于：不获取直接使用原来地址
		 * 大于：更新时间戳，使用新的地址
		 * {
		 * 		timestamp: 123123123123, // 最近一次成功获取的时间戳
		 * 		lat: 30, // 维度
		 * 		lng: 120 // 经度
		 * }
		 */
		let lat = sessionStorage.getItem('lat');
		let lng = sessionStorage.getItem('lng');
		let timestamp = sessionStorage.getItem('timestamp');
		const now = moment().format('X');
		if (timestamp) {
			const timeDelta = now - timestamp;
			if (timeDelta < LOCATION_SAVE_TIMEOUT) {
				this.props.homeGetNearbyMd(lat, lng, () => {
					// 回调保存券id到state，显示选择提货站点
					this.setState({
						quan_id: quan.Id,
						showMask: true
					});
				});
			} else {
				this.getCurrentWxLocation(quan);
			}
		} else {
			this.getCurrentWxLocation(quan);
		}
	};

	/**
	 * 调用接口请求抽券
	 */
	handleDoQiang = () => {
		const quan_id = this.state.quan_id;
		const md_id = this.state.selectedMd;
		if (md_id == '0') {
			const snackBar = { open: true, message: "请选择一个提货站点" };
			store.dispatch(commonUpdateSnackBar(snackBar));
			return false;
		}
		this.setState({
			showMask: false
		});
		this.props.homeDoQiang(quan_id, md_id);
	};

	handleSelectMd = (event, index, value) => {
		this.setState({
			selectedMd: value
		});
	};

	handleCloseSelectMd = () => {
		this.setState({
			showMask: false
		});
	};


	handleCloseQuan = () => {
		store.dispatch(homeUpdateShowQuan(false));
	};


	render() {
		let { home } = this.props;
		const quans = home.get('quans');
		let mds = home.get('mds') || Immutable.fromJS([]);
		let quan = home.get('quan') || Immutable.fromJS({});
		let showQuan = home.get('showQuan') || false;

		home = home.toJS();
		let { sliders } = home;
		const sliderHtml = sliders.map((slider) => {
			return (
				<div className="swiper-slide" key={slider.Id}>
					<img src={slider.img} style={styles.slider} onClick={this.handleSliderClick.bind(this, slider.url)}/>
				</div>
			);
		});

		// 选择站点对话框
		mds = mds.toJS();
		let mdsHtml = mds.map((md, idx) => {
			let distance = parseInt(md.juli); // 米
			if (distance < 1000) {
				distance = `${distance}米`;
			} else {
				distance = distance / 1000; // 公里
				distance.toFixed(3);
				distance = `${distance}公里`;
			}
			const text = `${md.name}(${distance})`;
			return (
				<MenuItem value={md.Id} primaryText={text} key={idx}/>
			);
		});
		const prefixHtml = <MenuItem value='0' primaryText="请选择门店" key="a"/>
		mdsHtml = _.concat([ prefixHtml ], mdsHtml);

		// 弹出抢到的优惠券
		quan = quan.toJS();

		const selectMdActions = [
			<RaisedButton
				label="抢购"
				secondary={true}
				onClick={this.handleDoQiang}
			/>,
			<RaisedButton
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseSelectMd}
			/>
		];

		const quanActions = [
			<RaisedButton
				style={{marginLeft: '.5rem'}}
				label="关闭"
				primary={true}
				onTouchTap={this.handleCloseQuan}
			/>
		];


		return (
			<div>
				<div className="swiper-container" style={styles.swiperWrapper}>
					<div className="swiper-wrapper">
						{sliderHtml}
					</div>
					<div className="swiper-pagination"></div>
				</div>

				<div className="displayFlex justifyContentCenter alignItemCenter" style={styles.headTitle}>
					优惠券
				</div>
				<QuanList origin={RouterMap.Home} quans={quans} qiangFn={this.handleQiang}/>

				<RedirectButton name="我的券" path="/UserCenter"/>

				<Dialog
					title="选择提货门店"
					actions={selectMdActions}
					open={this.state.showMask}
				>
					<SelectField
						fullWidth={true}
						value={this.state.selectedMd}
						onChange={this.handleSelectMd}
					>
						{mdsHtml}
					</SelectField>
				</Dialog>

				<Dialog
					title={quan.goods_name}
					actions={quanActions}
					open={showQuan}
					onRequestClose={this.handleCloseQuan}
				>
					<div><span>只需扫码付款:</span><span style={{color: 'green', fontWeight: '600'}}>&nbsp;{quan.money}元</span></div>
					<div><span style={{fontSize: '1.5rem'}}>条码:&nbsp;{quan.no}</span></div>
					<div style={{marginTop: '.5rem'}}>
						<img style={{width: '100%'}} src={`${config.root_path}/barcode/test.php?codebar=BCGcode128&text=${quan.no}`}/>
					</div>
				</Dialog>

			</div>
		);
	}
}


export default Comp;