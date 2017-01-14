import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux'; 
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import components
import Home from './components/Home';
import About from './components/About';
import Counter from './components/Counter';
import Todo from './components/Todo';
import NotFound from './components/NotFound';
// import reducers
import mainReducer from './components/mainReducer';
// import default states
import defaultState from './components/defaultState';


/* Store */ 
export const store = createStore(
  combineReducers({
      ...mainReducer,
      routing: routerReducer
    }),
    defaultState
);
/* History */ 
export const history = syncHistoryWithStore(browserHistory, store);
// combine redux router with react
const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/counter" component={Counter}/>
            <Route path="/todo" component={Todo}/>
            <Route path="*" component={NotFound}/>
        </Router>
    </Provider>
);


export default App;