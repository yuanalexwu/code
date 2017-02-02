/**
 * Created by jack on 2016/10/20.
 */
import Prefixer from 'inline-style-prefixer'

const userAgent = window.navigator.userAgent;
const prefixer = new Prefixer({userAgent});


const white = '#ffffff';
const red = '#da251c';
const black = '#000000';
const actionFontcolor = '#cccccc';

const styles = {
	quanListWrapper: {
		width: '96%',
		margin: '0 2%',
		marginTop: '.5rem',
	},
	quanWrapper: {
		margin: '1rem 0',
		position: 'relative',
		height: '14rem',
		overflow: 'hidden',
		borderRadius: '.5rem',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	quanLine: {
		position: 'absolute',
		top: '0px',
		right: '13%',
		width: '1.5rem',
		height: '14rem',
	},
	quanUp: {
		width: '100%',
		height: '11rem',
		background: white,
		color: black,
		display: 'flex',
		justifyContent: 'space-between',
	},
	quanLeft: {
		display: 'flex',
		flexDirection: 'column',
		width: '80%',
		marginLeft: '1rem',
	},
	quanLeftUp: {
		display: 'flex',
	},
	quanImg: {
		width: '8rem',
		height: '8rem',
	},
	quanTitleWrapper: {
		fontSize: '1.5rem',
		marginLeft: '1rem',
		overflow: 'hidden',
	},
	quanTitle: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	quanPrice: {
		fontSize: '3rem',
		color: red,
	},
	quanLeftDown: {
		display: 'inline-table',
		background: '#ffe1df',
		borderRadius: '1rem',
		padding: '0.25rem 1rem',
		fontSize: '1.5rem',
	},
	quanRight: {
		textAlign: 'center',
		width: '1.8rem',
		fontSize: '1.8rem',
		paddingTop: '2rem',
		marginRight: '5%',
	},

	quanDown: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: '3rem',
		background: red,
		color: white,
		fontSize: '2rem',
	},
};


export default prefixer.prefix(styles);
