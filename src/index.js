import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {AllReducers} from './core/redux/reducers/allReducers';
import {App} from './core/sample/app';
import {Playground} from './core/react/playground';
import logger from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'typeface-roboto';

let store = createStore(AllReducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
  <Playground/>
</Provider>, document.getElementById('root'));
registerServiceWorker();