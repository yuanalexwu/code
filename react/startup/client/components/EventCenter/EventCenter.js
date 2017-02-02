/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';
import Immutable from 'immutable';
import styles from './EventCenterStyle';
import config from '../../config';
import RedirectButton from '../Misc/RedirectButton';
import EventItem from './EventItem';


class EventCenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '打造常熟第一农产基地微团平台'
		}
	}

	handleClick = (url) => {
		window.location.href = url;
		return false;
	};

	componentWillMount() {
		document.title = this.state.title;
	}

	componentDidMount() {
		document.title = this.state.title;
		this.props.eventCenterGetInitData();
	}

	componentDidUpdate() {
		document.title = this.state.title;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.eventCenter.equals(this.props.eventCenter)) {
			return false;
		}
		return true;
	}

	render() {
		let { eventCenter } = this.props;
		eventCenter = eventCenter ? eventCenter : Immutable.fromJS([]);
		eventCenter = eventCenter.toJS();
		const eventHtml = eventCenter.map((event, idx) => {
			return (
				<EventItem key={idx} item={event}/>
			);
		});

		const head_img_src = `${config.root_path}/public/img/event_head.jpg`;
		const qrcode_img_src = `${config.root_path}/public/img/event_qrcode.jpg`;

		return (
			<div style={styles.eventImg}>
				<img src={head_img_src} style={styles.head}/>
				<div style={{width: '100%', textAlign: 'center', background: 'white', paddingBottom: '1rem', fontSize: '1.8rem'}}>
					<img src={qrcode_img_src} style={styles.qrcode}/>
					<div style={styles.qrcode_info}>扫码关注家易乐客服服务二维码</div>
					<div style={styles.qrcode_info}>您身边的贴心私人客服</div>
				</div>
				<div style={styles.contentWrapper}>
					<div style={styles.contentInner}>
						{eventHtml}
					</div>
				</div>
				<RedirectButton name="订单" path="/UserCenter"/>
			</div>
		);
	}
}


export default EventCenter;
