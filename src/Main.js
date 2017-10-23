import React from 'react';
import {Switch, Route} from 'react-router-dom';
import FourOhFour from './pages/fourOhFour';
import {Body} from './core/react/body';
import {FeedbackForm, ReportBugForm} from './pages/embeddedPage';

export const Main = () => (
    <Switch>
        <Route exact path='/' component={Body}/>
        <Route exact path='/feedbackForm' component={FeedbackForm}/>
        <Route exact path='/reportBugForm' component={ReportBugForm}/>
        <Route exact path='/404' component={FourOhFour}/>
    </Switch>
);
