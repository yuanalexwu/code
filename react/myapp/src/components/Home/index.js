import React, {Component} from 'react';
import logo from './logo.svg';
import './style.css';


class Home extends Component {
	static childContextTypes = {
		message: React.PropTypes.string
	};
	
	getChildContext() {
		return {
			message: 'App message'
		}
	}
	
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React 1123123</h2>
				</div>
			</div>
		);
	}
}

export default Home;
