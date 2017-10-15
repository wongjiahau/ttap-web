import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

ReactDOM.render(
    <Router >
    <App/>
</Router>, document.getElementById('root'));
registerServiceWorker();
