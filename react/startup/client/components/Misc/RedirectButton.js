/**
 * Created by jack on 2016/10/25.
 */
import React, {Component} from 'react';
import {history} from '../../store';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import config from '../../config';


class RedirectButton extends Component {
	constructor(props) {
		super(props);
	}

	handleRedirect = () => {
		let { path } = this.props;
		path = path || '/Home';
		// if (path == '/Home') {
		// 	window.location.href = `${config.root_path}/Home`;
		// 	return false;
		// }
		history.push(path);
		return false;
	};

	render() {
		const { name } = this.props;
		const directBtnStyle = {
			fontSize: '1.5rem',
			position: 'fixed',
			bottom: '2rem',
			left: '2rem',
			zIndex: '3',
		};

		return (
			<FloatingActionButton secondary={true} onClick={this.handleRedirect} style={directBtnStyle}>
				<span style={{color: '#ffffff', fontSize: '2rem'}}>{name}</span>
			</FloatingActionButton>
		);
	}

}


RedirectButton.propTypes = {
	name: React.PropTypes.string,
	path: React.PropTypes.string
};


export default RedirectButton;
