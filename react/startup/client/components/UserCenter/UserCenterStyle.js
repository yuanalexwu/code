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
	userCenterWrapper: {
		fontSize: '1.5rem',
	},
	backStyle: {
		background: red,
		display: 'flex',
		alignItems: 'center',
	},
	userInfoWrapper: {
		background: red,
		color: white,
		display: 'flex',
		alignItems: 'center',
		padding: '1rem 1rem',
		justifyContent: 'space-between',
	},
	userAvatarWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	userAvatar: {
		width: '5rem',
		height: '5rem',
		border: `1px solid ${redBorder}`,
		borderRadius: '2.5rem',
		overflow: 'hidden',
	},
	userName: {
		fontWeight: '600',
		color: white,
		marginLeft: '1rem'
	},
	userBindBtn: {},
	userScoreWrapper: {
		display: 'flex',
		padding: '1rem 0',
		justifyContent: 'space-between',
		alignItems: 'center',
		background: white,
	},
	userScoreLine: {
		borderLeft: `1px solid ${g.BackgroundColor}`,
		borderRight: `1px solid ${g.BackgroundColor}`,
	},
	userScore: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		width: '33%',
	},
	userScoreUp: {
		fontWeight: '600',
	},
	userScoreDown: {
		color: black,
	},

	mainTab: {
		color: gray,
		fontWeight: '600',
	},
	mainTabSelected: {
		color: red,
	},
	mainTabAction: {
		background: red,
	},

	quanTab: {
		color: gray,
	},
	quanTabAction: {
		background: red,
	},

	weiTuanTab: {
		color: gray,
	},
	weiTuanTabAction: {
		background: red,
	},

	orderWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		borderBottom: `2px solid ${red}`,
		margin: '1rem 0',
		padding: '.5rem 0',
		background: white,
	},
	orderInner: {
		width: '96%',
	},
	orderNo: {
		display: 'flex',
		justifyContent: 'space-between',
		fontWeight: '600',
	},
	orderMain: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderBottom: `1px solid ${black}`,
		padding: '.5rem 0',
		marginBottom: '.5rem',
	},
	orderMainLeft: {
		display: 'flex',
	},
	orderImg: {
		width: '4rem',
		height: '4rem',
	},
	orderName: {
		marginLeft: '.5rem',
		width: '15rem',
	},
	orderMainRight: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '10px 0px',
	},
	orderPrice: {
		fontWeight: '600',
	},
	orderNum: {
		textAlign: 'right',
	},

	weituanOrderConsignee: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	weituanOrderAddress: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	weituanOrderListTotal: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '.5rem 0'
	}
};

export default prefixer.prefix(styles);
