/**
 * Created by jack on 2016/11/14.
 */
import React, {Component, PropTypes} from 'react';
import Util from './Util';
import Immutable from 'immutable';


class ShopLocationMap extends Component {
	static propTypes = {
		md: PropTypes.object.isRequired,
		hide: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		md: { x1: '120', y1: '30', name: '自提站点' },
		hide: true,
	};

	constructor(props, context) {
		super(props, context);
	}

	importBaiduMap = () => {
		if (window.BMap === undefined) {
			const util = new Util();
			const jsPath = `http://api.map.baidu.com/getscript?v=2.0&ak=your_key`;
			util.importJs(jsPath);
		}
	};

	initMap = () => {
		const { md, hide } = this.props;
		if (hide) {
			return false;
		}
		if (window.BMap) {
			// 清除原来的地图信息
			const bMapDom = document.getElementById('bMap');
			if (bMapDom) {
				bMapDom.innerHTML = '';
			}
		}
		// 初始化
		try {
			const map = new BMap.Map('bMap');
			const point = new BMap.Point(md.x1, md.y1);
			map.centerAndZoom(point, 15);
			this.addMarker(map, md);
		} catch (e) {
			// 由于是异步加载的，在js还未加载完成的情况下
			// 需要延时重新调用
			setTimeout(() => {
				// 递归调用自己
				this.initMap();
			}, 1000);
		}
	};

	addMarker = (map, md) => {
		const point = new BMap.Point(md.x1, md.y1);
		// 设置图标
		// const icon = new BMap.Icon(`${config.root_path}/public/img/marker.ico`, { width: 16, height: 16 });
		// const marker = new BMap.Marker(point, { icon: icon });
		const marker = new BMap.Marker(point);
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
	};

	componentWillMount() {
		// 加载地图组件
		this.importBaiduMap();
	}

	componentDidMount() {
		// dom初始准备完成初始化地图
		this.initMap();
	}

	componentDidUpdate() {
		// dom更新准备完成初始化地图
		this.initMap();
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if (Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))) {
			return false;
		}
		return true;
	}


	render() {
		const { hide } = this.props;
		let mapStyle = { width: '100%', height: '150px' };
		if (hide) {
			mapStyle.display = 'none';
		}
		return (
			<div id="bMap" style={mapStyle}>地图加载中...</div>
		);
	}
}


export default ShopLocationMap;
