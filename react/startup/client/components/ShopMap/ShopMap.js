/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';
import Util from '../../util/Util';
import RedirectButton from '../Misc/RedirectButton';
import config from '../../config';


class ShopMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '门店分布'
		}
	}

	// 百度地图创建标注
	addMarker = (map, md) => {
		// const opts = {
		// 	width: 50,     // 信息窗口宽度
		// 	height: 40,     // 信息窗口高度
		// 	title: "提货门店", // 信息窗口标题
		// 	enableMessage: true//设置允许信息窗发送短息
		// };

		const point = new BMap.Point(md.x1, md.y1);
		// 设置图标
		const icon = new BMap.Icon(`${config.root_path}/public/img/marker.ico`, { width: 16, height: 16 });
		const marker = new BMap.Marker(point, { icon: icon });
		map.addOverlay(marker);

		// 设置文字说明
		const labelOpts = {
			position: point,
			offset: { width: 16, height: -25 }
		};
		const label = new BMap.Label(md.name, labelOpts);
		label.setStyle({
			padding: "5px",
			border: "1px solid black",
			borderRadius: '5px',
			color: "red",
		});
		marker.setLabel(label);

		// 点击事件
		// addClickHandler(md.name, marker);
		// function addClickHandler(content, marker) {
		// 	marker.addEventListener("click", function (e) {
		// 			openInfo(content, e)
		// 		}
		// 	);
		// }

		// function openInfo(content, e) {
		// 	var p = e.target;
		// 	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		// 	var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
		// 	map.openInfoWindow(infoWindow, point); //开启信息窗口
		// }
	};


	initBMap = () => {
		let { shopMap } = this.props;
		shopMap = shopMap.toJS();
		const { mds } = shopMap;

		if (window.BMap) {
			// 清除原来的地图信息
			const bMapDom = document.getElementById('bMap');
			bMapDom.innerHTML = '';
		}
		// 初始化
		try {
			const map = new BMap.Map('bMap');
			const point = new BMap.Point(120.761208, 31.672647);
			map.centerAndZoom(point, 15);
			mds.map(md => {
				this.addMarker(map, md);
			});
		} catch (e) {
			// 由于是异步加载的，在js还未加载完成的情况下
			// 需要延时重新调用
			setTimeout(() => {
				// 递归调用自己
				this.initBMap();
			}, 1000);
		}
	};


	componentDidMount() {
		document.title = this.state.title;
		// 获取门店信息
		this.props.shopMapGetInitData();
	}

	componentWillMount() {
		document.title = this.state.title;
		const util = new Util();
		const jsPath = `http://api.map.baidu.com/getscript?v=2.0&ak=7fae2c3df8297e4b7b6dcdfc502439f0`;
		util.importJs(jsPath);
	}

	componentDidUpdate() {
		document.title = this.state.title;
		this.initBMap();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.shopMap.equals(nextProps.shopMap)) {
			return false;
		}
		return true;
	}


	render() {
		const height = `${window.outerHeight}px`;
		const mapStyle = {
			fontSize: '2rem',
			width: '100%',
			height
		};

		const directBtnStyle = {
			position: 'fixed',
			bottom: '2rem',
			left: '2rem',
		};

		return (
			<div>
				<div id="bMap" style={mapStyle}>
				</div>
				<RedirectButton name="首页" path="/Home"/>
			</div>
		);
	}
}


export default ShopMap;
