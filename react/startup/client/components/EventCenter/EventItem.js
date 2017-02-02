/**
 * Created by jack on 2016/11/15.
 */
import React, {Component, PropTypes} from 'react';
import styles from './EventItemStyle';
import config from '../../config';
import moment from 'moment';
import Counter from './Counter';
import Immutable from 'immutable';


class EventItem extends Component {
	static propTypes = {
		item: PropTypes.object,
	};

	static defaultProps = {
		item: {
			Id: "7",
			link_url: "http://www.csckl.com/ytj/phone/wxActivity/pangxie/index.php",
			pic_url: "px1.jpg",
			e_time: "2016-11-17 10:10:10",
			state: '1', // 1: 销售中, 2: 已售罄
		}
	};
	
	static childContextTypes = {
		changeEventItemState: PropTypes.func
	};
	
	getChildContext() {
		return {
			changeEventItemState: this.changeEventItemState
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			re_render: false, // 重新渲染
		};
	}
	
	changeEventItemState = () => {
		this.setState({
			re_render: true
		});
	};


	/**
	 * 转换datetime格式成截止时间文本
	 * @param datetime
	 * @returns {string}
	 */
	parseTitle = (datetime) => {
		const timeObj = moment(datetime, "YYYY-MM-DD HH-mm-ss");
		const month = timeObj.format("MM");
		const day = timeObj.format("DD");
		return `到${month}月${day}活动截止`;
	}

	/**
	 * 判断活动是否在进行中
	 * @param datetime 2016-11-17 10:10:10"
	 * @returns {boolean}
	 */
	eventIsGoingOn = (datetime) => {
		let isGoingOn = true;
		const now_timestamp = moment().format('X');
		const end_timestamp = moment(datetime, "YYYY-MM-DD HH-mm-ss").format('X');
		if (now_timestamp >= end_timestamp) {
			isGoingOn = false;
		}
		return isGoingOn;
	};

	handleClick = () => {
		const { item } = this.props;
		window.location.href = item.link_url;
		return false;
	};

	shouldComponentUpdate(nextPorps, nextState) {
		if (
			Immutable.fromJS(nextPorps).equals(Immutable.fromJS(this.props)) &&
			Immutable.fromJS(nextState).equals(Immutable.fromJS(this.state))
		) {
			return false;
		}
		return true;
	}

	render() {
		const { item } = this.props;
		const { e_time } = item;
		const end_title = this.parseTitle(e_time);
		// 活动进行中
		let bottomHtml;
		let soldoutMaskHtml;
		let corner_img = "event_corner_end.png";
		if (this.eventIsGoingOn(e_time)) {
			corner_img = "event_corner.png";
			bottomHtml = (
				<div>
					<div style={styles.title}>&nbsp;{end_title}</div>
					<div style={styles.counter}><Counter datetime={item.e_time}/>&nbsp;</div>
				</div>
			);
		} else {
			bottomHtml = (
				<div style={styles.bottomEndFont}>
					活动截止
				</div>
			);

			const mask_img_src = `${config.root_path}/public/img/event_soldout_mask.png`;
			soldoutMaskHtml = (
				<img src={mask_img_src} style={styles.soldoutMask} onClick={this.handleClick}/>
			);
		}
		const corner_img_src = `${config.root_path}/public/img/${corner_img}`;

		// 商品是否售罄
		if (soldoutMaskHtml === undefined && item.state == 2) {
			const mask_img_src = `${config.root_path}/public/img/event_soldout_mask.png`;
			soldoutMaskHtml = (
				<img src={mask_img_src} style={styles.soldoutMask} onClick={this.handleClick}/>
			);
		}
		return (
			<div style={styles.wrapper}>
				<div style={styles.imgWrapper}>
					{soldoutMaskHtml}
					<img src={corner_img_src} style={styles.corner}/>
					<img src={`${config.img_path}${item.pic_url}`} style={styles.img} onClick={this.handleClick}/>
				</div>
				{bottomHtml}
			</div>
		);
	}
}


export default EventItem;
