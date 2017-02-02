/**
 * Created by jack on 2016/10/19.
 */
import Prefixer from 'inline-style-prefixer'

const userAgent = window.navigator.userAgent;
const prefixer = new Prefixer({userAgent});


let styles = {
	loading_outter: {
		zIndex: 10000,
		position: 'fixed',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%'
	},
	loading_background: {
		zIndex: 10001,
		position: 'absolute',
		top: '0px',
		left: '0px',
		width: '100%',
		height: '100%',
		background: 'rgb(222, 222, 222)'
	},
	loading_wrapper: {
		zIndex: 10002,
		position: 'absolute',
		top: '0px',
		left: '0px',
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loading_content: {
		display: 'flex',
		width: '10rem',
		height: '10rem',
		borderRadius: '.5rem',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		background: '#000000',
		boxShadow: '#292929 4px 4px 30px'
	},
	loading_img: {
		width: '5rem'
	},
	loading_span: {
		marginTop: '.5rem',
		fontSize: '1.5rem',
		color: '#ffffff'
	}
};


export default prefixer.prefix(styles);
