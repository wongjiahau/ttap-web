import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './core/sample/reducers';
import {App} from './core/sample/app';
import logger from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'typeface-roboto';

let store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();