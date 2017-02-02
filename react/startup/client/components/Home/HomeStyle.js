/**
 * Created by jack on 2016/10/19.
 */
import g from '../GlobalStyle';
import Prefixer from 'inline-style-prefixer'

const userAgent = window.navigator.userAgent;
const prefixer = new Prefixer({userAgent});

const white = '#ffffff';


const styles = {
	swiperWrapper: {
		width: '100%'
	},
	slider: {
		width: '100%'
	},
	headTitle: {
		width: '100%',
		height: '4rem',
		background: white,
		color: g.FrontColor,
		borderBottom: `.2rem solid ${g.FrontColor}`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '2rem'
	},
};

export default prefixer.prefix(styles);
