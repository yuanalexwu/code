// let's go!
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store, {history} from './store';
// materail-ui 用到了tap event
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Main from './components/Main';


const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Main}>
				<IndexRoute getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/Home/Home').default);
					}, 'Home');
				}} />
				<Route path="Home*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/Home/Home').default);
					}, 'Home');
				}} />
				<Route path="UserCenter*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/UserCenter/UserCenter').default);
					}, 'UserCenter');
				}} />
				<Route path="EventCenter*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/EventCenter/EventCenter').default);
					}, 'EventCenter');
				}} />
				<Route path="ShopMap*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/ShopMap/ShopMap').default);
					}, 'ShopMap');
				}} />
				<Route path="BuyFlowMap*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/Misc/BuyFlowMap').default);
					}, 'BuyFlowMap');
				}} />

				<Route path="*" getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./components/Home/Home').default);
					}, 'Home');
				}} />
			</Route>
		</Router>
	</Provider>
);


const RedBox = require('redbox-react').default;
try {
	render(
		router,
		document.getElementById('root')
	);
} catch (err) {
	render(
		<RedBox error={err}/>,
		document.getElementById('root')
	);
}
