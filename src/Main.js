import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Empty from './pages/Empty'

const Main = () => (
    <Switch>
        <Route exact path='/empty' component={Empty}/>
    </Switch>
);

export default Main;