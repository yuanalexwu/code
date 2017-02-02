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

const fontColor = '#c8281d';

const styles = {
	white,
	red,
	redBorder,
	gray,
	black,
	redDeep,
	fontColor,
	wrapper: {
		width: '100%',
		marginBottom: '.7rem',
		boxShadow: "0px 10px 36px -3px rgba(194,188,194,1)",
		background: white,
		paddingBottom: '.5rem',
		fontSize: '1.8rem',
	},
	img: {
		width: '100%',
	},
	title: {
		display: 'flex',
		color: fontColor,
	},

	imgWrapper: {
		position: 'relative',
	},
	corner: {
		position: 'absolute',
		zIndex: '2',
		top: '0px',
		left: '0px',
		width: '5rem',
	},
	soldoutMask: {
		width: '100%',
		position: 'absolute',
		zIndex: '1',
		top: '0px',
		left: '0px',
	},
	
	bottomEndFont: {
		color: fontColor,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	counter: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	
	
	counterWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		color: fontColor,
	},
	counterTimerWrapper: {
		background: black,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '.5rem',
		padding: '.5rem',
		margin: '0px .3rem',
	},
	counterTimeFont: {
		color: white,
		fontSize: '2rem',
		fontWeight: '700',
	},
};


export default prefixer.prefix(styles);
