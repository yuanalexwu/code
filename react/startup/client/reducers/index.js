import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import common from '../components/Common/CommonReducers';
import home from '../components/Home/HomeReducers';
import userCenter from '../components/UserCenter/UserCenterReducers';
import eventCenter from '../components/EventCenter/EventCenterReducers';
import shopMap from '../components/ShopMap/ShopMapReducers';


const rootReducer = combineReducers({
	common,
	home,
	userCenter,
	eventCenter,
	shopMap,

	routing: routerReducer
});

export default rootReducer;