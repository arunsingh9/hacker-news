import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './redux/reducers';
import mySaga from './redux/sagas';

import App from './containers/App';

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window !== 'undefined' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;
const sagaMiddleware = createSagaMiddleware();

const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

//const store = createStore(rootReducer, preloadedState);

// mount it on the Store
const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mySaga);

const wrapper = document.getElementById('container');
wrapper
	? ReactDOM.hydrate(
			<Provider store={store}>
				<App />
			</Provider>,
			wrapper
	  )
	: false;
