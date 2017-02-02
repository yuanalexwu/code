/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';
import styles from './UserCenterStyle';


class MyDialog extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let dialogWrapperStyle = {
			display: this.props.open ? 'block' : 'none',
			background: styles.white,
			position: 'fixed',
			top: '0px',
			left: '0px',
			height: '100%',
			width: '100%',
			zIndex: '1',
		};
		let dialogStyle = {
			width: '90%',
			marginLeft: '5%',
		};
		return (
			<div style={dialogWrapperStyle}>
				<div style={dialogStyle}>
					<h2>{this.props.title}</h2>
					<div>
						{this.props.children}
					</div>
					<div style={{textAlign: 'left'}}>
						{this.props.actions}
					</div>
				</div>
			</div>
		);
	};
}

export default MyDialog;