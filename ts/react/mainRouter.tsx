import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {MasterView} from "./masterView";
// import {FeedbackForm, ReportBugForm} from "./pages/embeddedPage";
// import FourOhFour from "./pages/fourOhFour";
// import {About, Tospp} from "./pages/markdownPages";
import {Playground} from "./playground";
import {Tutorial} from "./tutorial/tutorial";

export const MainRouter = () => (
    <Switch>
        <Route exact={true} path="/" component={Tutorial}/>
        <Route exact={true} path="/play" component={MasterView}/>
        {/* <Route exact={true} path="/feedbackForm" component={FeedbackForm}/>
        <Route exact={true} path="/reportBugForm" component={ReportBugForm}/>
        <Route exact={true} path="/404" component={FourOhFour}/> */}
        <Route exact={true} path="/playground" component={Playground}/>
        {/* <Route exact={true} path="/tospp" component={Tospp}/>
        <Route exact={true} path="/about" component={About}/> */}
    </Switch>
);
