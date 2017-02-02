import React, {Component, cloneElement} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import Loading from './Common/Loading';
import {commonUpdateSnackBar} from './Common/CommonAction';
import store from '../store';
import g from './GlobalStyle';
import ConnectModule from './ConnectModule';
import a from '../../public/js/resize';


class Main extends Component {
	constructor(props, context) {
		super(props, context);
	}
	static childContextTypes = {
		muiTheme: React.PropTypes.object.isRequired,
		router: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: getMuiTheme(baseTheme)
		};
	}

	componentDidMount() {
		// 应用第一次加载，获取需要的信息
		// 设置初始样式
		document.body.style.background = g.BackgroundColor;
	}

	handleClose() {
		const snack_bar_info = { open: false, message: '', autoHideDuration: 4000 };
		store.dispatch(commonUpdateSnackBar(snack_bar_info));
		return false;
	}

	render() {
		const { snackBar } = this.props.common;
		const newProps = {};
		Object.keys(this.props).map(key => {
			if (key != 'ref' && key != 'key') {
				newProps[key] = this.props[key];
			}
		});

		return (
			<div>
				<Snackbar
					open={snackBar.open}
					message={snackBar.message}
					autoHideDuration={snackBar.autoHideDuration}
					onRequestClose={this.handleClose.bind(this)}
				/>
				<Loading {...newProps}/>
				{cloneElement(this.props.children, newProps)}
			</div>
		);
	}
}

Main.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
	router: React.PropTypes.object
};

export default ConnectModule(Main);