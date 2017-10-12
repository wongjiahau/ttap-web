import React from 'react';
import Login from './pages/Login'
import {Switch, Route} from 'react-router-dom';
import Empty from './pages/Empty'

const Main = () => (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/empty' component={Empty}/>
    </Switch>
);

export default Main;