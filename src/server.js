import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import compression from 'compression';

import App from './containers/App';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import mySaga from './redux/sagas';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sheet = new ServerStyleSheet();

const PORT = process.env.PORT || 3006;
const app = express();

app.use(compression());

app.get('*.js', (req, res, next) => {
	if (req.header('Accept-Encoding').includes('br')) {
		req.url = req.url + '.br';
		console.log(req.header('Accept-Encoding'));
		res.set('Content-Encoding', 'br');
		res.set('Content-Type', 'application/javascript; charset=UTF-8');
	}
	next();
});

app.use(express.static('./dist'));
app.use('/static', express.static('./static'));

app.get('/*', (req, res) => {
	let preloadedState = {
		hits: [],
		pageNumber: 1,
	};

	(async () => {
		const response = await fetch(
			`http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${preloadedState.pageNumber}`
		);
		const news = await response.json();
		const { hits } = await news;
		preloadedState.hits = hits;

		// Create a new Redux store instance
		const sagaMiddleware = createSagaMiddleware();
		const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));
		sagaMiddleware.run(mySaga);

		const app = ReactDOMServer.renderToNodeStream(
			sheet.collectStyles(
				<Provider store={store}>
					<App />
				</Provider>
			)
		);

		const styleTags = sheet.getStyleTags();

		const finalState = store.getState();
		res.send(renderFullPage(app, finalState, styleTags));
		//sheet.seal();
	})();
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

function renderFullPage(app, finalState, styleTags) {
	return `
	  <!doctype html>
	  <html lang='en'>
		<head>
		  <title>Hacker News</title>
		  ${styleTags}
		  <link rel="manifest" href="static/manifest.json">
		  <meta name="theme-color" content="#ff6600"/>
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <meta name="description" content="A Hacker news aggregator website"/>
		</head>
		<body>
		  <div id="container">${app}</div>
		  <script>
			// WARNING: See the following for security issues around embedding JSON in HTML:
			// https://redux.js.org/recipes/server-rendering/#security-considerations
			window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}
		  </script>
		  <script src="main.js?v=1.0"></script>
		  <script>
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', function() {
				navigator.serviceWorker.register('/sw.js').then(function(registration) {
					console.log('ServiceWorker registration successful with scope: ', registration.scope);
				}, function(err) {
					console.log('ServiceWorker registration failed: ', err);
				});
				});
			}
			</script>
		</body>
	  </html>
	  `;
}
