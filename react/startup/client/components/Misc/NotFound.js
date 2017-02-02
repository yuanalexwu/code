/**
 * Created by jack on 2016/10/19.
 */
import React, {Component} from 'react';


const styles = {
	h1: {
		textAlign: 'center',
		fontSize: '2rem',
		color: 'cccccc'
	}
};


class NotFound extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title:  '微商品区'
		}
	}

	componentDidMount() {
		document.title = this.state.title;
	}

	componentDidUpdate() {
		document.title = this.state.title;
	}
	
	render() {
		return (
			<h1 style={styles.h1}>404页面无效</h1>
		);
	}
}


export default NotFound;
