/**
 * Created by jack on 2016/11/8.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Immutable from 'immutable';


class TimeDownButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '发送', // 按钮文本
			wait: 0, // 等待时间
			defaultWaitSecond: 60, // 默认等待时间
		};
		this.interval;
	}

	handleClick = () => {
		this.props.handleClick(() => {
			this.setState({
				wait: this.state.defaultWaitSecond, // 等待
			}, () => {
				this.interval = setInterval(() => {
					let { wait } = this.state;
					wait--;
					this.setState({wait});
					if (wait == 0) {
						if (this.interval) {
							clearInterval(this.interval);
						}
					}
				}, 1000);
			});
		});
	};

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (Immutable.fromJS(nextState).equals(Immutable.fromJS(this.state))) {
			return false;
		}
		return true;
	}

	render() {
		let { text, wait } = this.state;
		let disabled = false;
		if (wait != 0) {
			disabled = true;
			text = `${wait}s`;
		}

		return (
			<RaisedButton
				label={text}
				onClick={this.handleClick}
				disabled={disabled}
			/>
		);
	}
}


TimeDownButton.propTypes = {
	handleClick: React.PropTypes.func.isRequired,
};


class Parent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parentFoo: '111'
		};
	}
	render() {
		return this.props.children(this.state.parentFoo);
	}
}

class Son extends Component {
	render() {
		const { sonFoo } = this.props;
		return (
			<h1>{sonFoo}</h1>
		);
	}
}

class Container extends Component {
	render() {
		<Parent>
			{(parentFoo) => <Son sonFoo={parentFoo} />}
		</Parent>
	}
}







export default TimeDownButton;
