import './index.css';
import './semantic-ui-sidebar.css'
import 'typeface-roboto';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import logger from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
import {AllReducers} from './core/redux/reducers/allReducers';
import {App} from './App';
import {Playground} from './core/react/playground';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';

let store;
const isProductionBuild = false; // do not modify this line at all unless you know what you're doing, because .travis.yml will modify this line let store
if (isProductionBuild) {
  store = createStore(AllReducers)
} else {
  store = createStore(AllReducers, applyMiddleware(logger));
}

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();