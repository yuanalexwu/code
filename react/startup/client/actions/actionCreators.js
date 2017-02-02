import commonAction from '../components/Common/CommonAction';
import homeAction from '../components/Home/HomeAction';
import userCenterAction from '../components/UserCenter/UserCenterAction';
import eventCenterAction from '../components/EventCenter/EventCenterAction';
import shopMapAction from '../components/ShopMap/ShopMapAction';


const actionCreators = {
	...commonAction,
	...homeAction,
	...userCenterAction,
	...eventCenterAction,
	...shopMapAction
};

export default actionCreators;

