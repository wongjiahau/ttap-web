import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {MasterView} from "./masterView";
import {FeedbackForm, ReportBugForm} from "./pages/embeddedPage";
import {FourOhFour} from "./pages/fourOhFour";
import { StackPanel } from "./panels/stackPanel";
import {Playground} from "./playground";
import {MarkdownPage} from "./tutorial/markdownPage";
import {Tutorial} from "./tutorial/tutorial";

const width = 0.9 * window.innerWidth;
const height = 0.825 * window.innerHeight;

const Page = (src) => {
    return (
        <StackPanel orientation="vertical" horizontalAlignment="center">
            <MarkdownPage width={width} height={height} src={src}/>
            {""}
        </StackPanel>
    );
};
const About = () => Page("https://raw.githubusercontent.com/wongjiahau/ttap-web/master/README.md");
const Tospp = () => Page("https://raw.githubusercontent.com/wongjiahau/ttap-web/master/TOSPP.md");

export const MainRouter = () => (
    <Switch>
        <Route exact={true} path="/" component={Tutorial}/>
        <Route exact={true} path="/play" component={MasterView}/>
        <Route exact={true} path="/feedbackForm" component={FeedbackForm}/>
        <Route exact={true} path="/reportBugForm" component={ReportBugForm}/>
        <Route exact={true} path="/404" component={FourOhFour}/>
        <Route exact={true} path="/playground" component={Playground}/>
        <Route exact={true} path="/tospp" component={Tospp}/>
        <Route exact={true} path="/about" component={About}/>
    </Switch>
);
