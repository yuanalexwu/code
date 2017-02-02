/**
 * Created by jack on 2016/10/20.
 */
import React, {Component, PropTypes} from 'react';
import styles from './QuanListStyle';
import config from '../../config';
import moment from 'moment';
import RouterMap from '../RouterMap';
import Immutable from 'immutable';


class QuanList extends Component {
	static propTypes = {
		quans: PropTypes.instanceOf(Immutable.List).isRequired,
		origin: PropTypes.string.isRequired,
		qiangFn: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	handleQiang(quan, origin) {
		const quanIsAvaiable = this.checkQuanAvaiable(quan, origin);
		const { qiangFn } = this.props;
		if (typeof qiangFn === 'function') {
			qiangFn(quan, quanIsAvaiable);
		}
	}

	shuouldComponentUpdate(nextProps, nextState) {
		const { quans } = nextProps;
		if (quans.equals(this.props.quans)) {
			return false;
		}
		return true;
	}

	/**
	 *
	 * @param quan 券信息
	 * @param origin 券显示的来源
	 * @returns {boolean}
	 */
	checkQuanAvaiable(quan, origin) {
		let avaiable = true;
		const { state } = quan;
		if (origin == RouterMap.Home) {
			if (state != '1') {
				avaiable = false;
			}
		} else if (origin == RouterMap.UserCenter) {
			if (state != '0') {
				avaiable = false;
			}
		}

		// 时间过期
		const today = moment().format('YYYY-MM-DD');
		if (origin == RouterMap.Home) {
			if (today > quan.e_date) {
				avaiable = false;
			}
		} else if (origin == RouterMap.UserCenter) {
			if (today < quan.s_date || today > quan.e_date) {
				avaiable = false;
			}
		}

		return avaiable;
	}

	/**
	 *
	 * @param quan 券信息
	 * @returns {string} 券对应的操作文字
	 */
	getActionName(quan, origin) {
		const today = moment().format('YYYY-MM-DD');
		if (origin == RouterMap.Home) {
			quanAction = '立即抢';
			if (today > quan.e_date) {
				quanAction = '已结束';
			}
			return quanAction;
		}
		const { state } = quan;
		let quanAction = "&nbsp;"; // 券状态对应的操作文字
		if (state == '0') {
			quanAction = '立即使用';
			if (today > quan.e_date) {
				quanAction = '已过期';
			}
		} else if (state == '1') {
			quanAction = '已使用';
		}
		return quanAction;
	}

	shouldComponentUpdate(np, ns) {
		const { quans } = np;
		if (quans.equals(this.props.quans)) {
			return false;
		}

		return true;
	}

	render() {
		let { quans, origin } = this.props;
		quans = quans ? quans : Immutable.fromJS([]);
		origin = origin ? origin : "";
		quans = quans.toJS();
		const isEmpty = quans.length > 0 ? false : true;
		let quanHtml = quans.map((quan, idx) => {
			const quanIsAvaiable = this.checkQuanAvaiable(quan, origin);
			const quanAction = this.getActionName(quan, origin);

			let quanWrapper = { ...styles.quanWrapper };
			if (!quanIsAvaiable) {
				quanWrapper.filter = 'grayscale(1)';
				quanWrapper.WebkitFilter = 'grayscale(1)';
			}
			// TODO 等接口修改好后取消注释
			const quan_img = `${config.img_path}${quan.img_path}`;
			let quan_name = '';
			let quan_price = '';
			if (origin == RouterMap.Home) {
				quan_name = quan.name;
				quan_price = quan.price;
			} else if (origin == RouterMap.UserCenter) {
				quan_name = quan.quan_name;
				quan_price = quan.money;
			}

			const old_price = `原价: ￥${quan.price_old}`;


			return (
				<div className="displayFlex flexDirectionColumn alignItemCenter" style={quanWrapper} key={idx}>
					<img style={styles.quanLine} src={`${config.root_path}/public/img/quan_line.png`}/>
					<div className="displayFlex justifyContentSpaceBetween" style={styles.quanUp}>
						<div style={styles.quanLeft}>
							<div className="displayFlex" style={styles.quanLeftUp}>
								<img style={styles.quanImg} src={quan_img}/>
								<div style={styles.quanTitleWrapper}>
									<div>&nbsp;</div>
									<div style={styles.quanTitle}>{quan_name}</div>
									<div style={styles.quanPrice}>￥{quan_price}</div>
								</div>
							</div>
							<span style={styles.quanLeftDown}>{old_price}</span>
						</div>
						<div style={styles.quanRight} onClick={this.handleQiang.bind(this, quan, origin)}>{quanAction}</div>
					</div>
					<div style={styles.quanDown}>&nbsp;&nbsp;&nbsp;{quan.s_date}~{quan.e_date}</div>
				</div>
			);
		});

		if (isEmpty) {
			quanHtml = (
				<div>
					<h2 style={{textAlign: 'center', color: 'gray'}}>暂无信息</h2>
				</div>
			);
		}

		return (
			<div style={styles.quanListWrapper}>
				{quanHtml}
			</div>
		);
	}
}


export default QuanList;
