import {applyMiddleware, createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {useRouterHistory} from 'react-router';
import {createHistory} from 'history';
import thunk from 'redux-thunk';
import config from './config';

// import the root reducers
import rootReducer from './reducers/index';

// default data
import common from './components/Common/CommonData';
import home from './components/Home/HomeData';
import userCenter from './components/UserCenter/UserCenterData';
import eventCenter from './components/EventCenter/EventCenterData';
import shopMap from './components/ShopMap/ShopMapData';


// create an object for the default data
const defaultState = {
	common,
	home,
	userCenter,
	eventCenter,
	shopMap,
};

// support to redux devTools
const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

// apply redux middleware
const finalCreateStore = compose(
	applyMiddleware(thunk)
)(createStore);

const store = finalCreateStore(rootReducer, defaultState, enhancers);

const user_history = useRouterHistory(createHistory)({
	basename: config.root_path
});
export const history = syncHistoryWithStore(user_history, store);

export default store;