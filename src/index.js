import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './core/sample/reducers';
import {App} from './core/sample/app';

let store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
// import React from 'react'; import ReactDOM from 'react-dom'; import
// './index.css'; import App from './App'; import registerServiceWorker from
// './registerServiceWorker'; import 'typeface-roboto'; ReactDOM.render( <App/>
// , document.getElementById('root')); registerServiceWorker();