/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';
import config from '../../config';
import RedirectButton from './RedirectButton';


const styles = {
	img: {
		width: '100%'
	},
};


class BuyFlowMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '购买流程'
		}
	}

	componentWillMount() {
		document.title = this.state.title;
	}

	componentDidMount() {
		document.title = this.state.title;
	}

	componentDidUpdate() {
		document.title = this.state.title;
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div>
				<img style={styles.img} src={`${config.root_path}/public/img/buy-flow-map.jpg?v=1`}/>
				<RedirectButton name="首页" path="/Home" />
			</div>
		);
	}
}


export default BuyFlowMap;
