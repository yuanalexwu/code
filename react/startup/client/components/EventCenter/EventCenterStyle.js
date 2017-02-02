/**
 * Created by jack on 2016/10/19.
 */
import g from '../GlobalStyle';
import Prefixer from 'inline-style-prefixer'

const userAgent = window.navigator.userAgent;
const prefixer = new Prefixer({ userAgent });


const white = '#ffffff';
const red = '#e45050';
const redBorder = '#be3b3b';
const gray = '#969696';
const black = '#000000';
const redDeep = '#da251c';


const styles = {
	white,
	red,
	redBorder,
	gray,
	black,
	redDeep,
	head: {
		display: 'block',
		width: '100%',
	},
	qrcode: {
		width: '15rem',
	},
	qrcode_info: {
		color: '#494949',
	},
	eventImg: {
		width: '100%',
	},
	contentWrapper: {
		width: '100%',
		background: white,
	},
	contentInner: {
		width: '98%',
		marginLeft: '1%',
	},

}
;


export default prefixer.prefix(styles);
