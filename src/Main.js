import React from 'react';
import Login from './pages/Login'
import {Switch, Route} from 'react-router-dom';
import Empty from './pages/Empty'

const Main = () => (
    <Switch>
        <Route exact path='/empty' component={Empty}/>
        <Route exact path='/login' component={Login}/>
    </Switch>
);

export default Main;