/**
 * Created by jack on 2016/11/16.
 */
import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import styles from './EventItemStyle';
import moment from 'moment';


class Counter extends Component {
	static propTypes = {
		datetime: PropTypes.string.isRequired,
	};

	static defaultProps = {
		datetime: '2016-11-16 10:10:10',
	};

	static contextTypes = {
		changeEventItemState: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.interval;
		const { datetime } = this.props;
		this.state = {
			datetime,
			day: '00',
			hour: '00',
			minute: '00',
			second: '00',
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (Immutable.fromJS(nextState).equals(Immutable.fromJS(this.state))) {
			return false;
		}
		return true;
	}

	/**
	 * 将时间差转换为天/小时/分/秒
	 * @param timedelta 秒为单位
	 */
	parseTime = (timedelta) => {
		const hours = Math.floor(timedelta / 3600);
		let day = Math.floor(hours / 24);
		let hour = hours % 24;
		let minute = Math.floor((timedelta - hours * 3600) / 60);
		let second = timedelta % 60;
		// beautify
		day = `${day}`;
		hour = `${hour}`;
		minute = `${minute}`;
		second = `${second}`;
		if (day.length < 2) {
			day = `0${day}`;
		}
		if (hour.length < 2) {
			hour = `0${hour}`;
		}
		if (minute.length < 2) {
			minute = `0${minute}`;
		}
		if (second.length < 2) {
			second = `0${second}`;
		}
		return {
			day,
			hour,
			minute,
			second
		};
	};

	updateTime = () => {
		if (this.interval) {
			clearInterval(this.interval);
		}
		let now;
		this.interval = setInterval(() => {
			now = parseInt(moment().format('X'));
			const datetime = parseInt(moment(this.state.datetime, "YYYY-MM-DD HH:mm:ss").format('X'));
			if (now >= datetime) {
				this.setState({
					day: '00',
					hour: '00',
					minute: '00',
					second: '00',
				});
				this.context.changeEventItemState();
			} else {
				const timedelta = datetime - now;
				const leftTime = this.parseTime(timedelta);
				this.setState({
					day: leftTime.day,
					hour: leftTime.hour,
					minute: leftTime.minute,
					second: leftTime.second
				});
			}
		}, 1000);
	};

	componentDidMount() {
		this.updateTime();
	}

	componentDidUpdate() {
		this.updateTime();
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	render() {
		const { day, hour, minute, second } = this.state;
		return (
			<div style={styles.counterWrapper}>
				剩余
				<span style={styles.counterTimerWrapper}><span style={styles.counterTimeFont}>{day}</span></span>
				天
				<span style={styles.counterTimerWrapper}><span style={styles.counterTimeFont}>{hour}</span></span>
				时
				<span style={styles.counterTimerWrapper}><span style={styles.counterTimeFont}>{minute}</span></span>
				分
				<span style={styles.counterTimerWrapper}><span style={styles.counterTimeFont}>{second}</span></span>
				秒
			</div>
		);
	}
}


export default Counter;
