import React, {Component} from 'react';
import config from '../../config';
import styles from './LoadingStyle';


class Loading extends Component {
	render() {
		const { showLoadingMask } = this.props.common;
		// 根据传入的参数修改样式状态
		const loading_outter = {...styles.loading_outter};
		loading_outter.display = showLoadingMask ? 'block' : 'none';

		const loading_img_path = `${config.root_path}/public/img/loading.gif`;
		return (
			<div className="displayFlex justifyContentCenter alignItemCenter" style={loading_outter}>
				<div style={styles.loading_background}></div>
				<div className="displayFlex alignItemCenter justifyContentCenter" style={styles.loading_wrapper}>
					<div className="displayFlex flexDirectionColumn alignItemCenter" style={styles.loading_content}>
						<img style={styles.loading_img} src={loading_img_path}/>
						<span style={styles.loading_span}>加载中...</span>
					</div>
				</div>
			</div>
		);
	}
}


export default Loading;