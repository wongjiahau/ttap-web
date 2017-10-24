import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './core/sample/reducers';
import {App} from './core/sample/app';
import logger from 'redux-logger'

let store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
// import React from 'react'; import ReactDOM from 'react-dom'; import
// './index.css'; import App from './App'; import registerServiceWorker from
// './registerServiceWorker'; import 'typeface-roboto'; ReactDOM.render( <App/>
// , document.getElementById('root')); registerServiceWorker();