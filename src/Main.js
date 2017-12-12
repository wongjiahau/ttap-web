import FourOhFour from './pages/fourOhFour';
import React from 'react';
import {FeedbackForm, ReportBugForm} from './pages/embeddedPage';
import {Playground} from './core/react/playground';
import {MasterView} from './core/react/masterView';
import {Tutorial} from './core/react/tutorial/tutorial';
import {Switch, Route} from 'react-router-dom';
import {About, Tospp} from './pages/markdownPages';

export const Main = () => (
    <Switch>
        <Route exact path='/' component={Tutorial}/>
        <Route exact path='/play' component={MasterView}/>
        <Route exact path='/feedbackForm' component={FeedbackForm}/>
        <Route exact path='/reportBugForm' component={ReportBugForm}/>
        <Route exact path='/404' component={FourOhFour}/>
        <Route exact path='/demo' component={Playground}/>
        <Route exact path='/tospp' component={Tospp}/>
        <Route exact path='/about' component={About}/>
    </Switch>
);
