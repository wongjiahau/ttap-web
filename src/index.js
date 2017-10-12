import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, IndexRoute} from 'react-router-dom'
import './index.css';
import App from './App';
import {Login} from './pages/Login'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router >
    <App/>
</Router>, document.getElementById('root'));
registerServiceWorker();
