import * as React from "react";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import { RawReadmeUrl, RawTosppUrl } from "../constants";
import { FgoViewContainer } from "../redux/containers/fgoViewContainer";
import { LoginContainer } from "../redux/containers/loginContainer";
import { SelectCourseViewContainer } from "../redux/containers/selectCourseContainer";
import { GetStarted } from "./getStarted";
import { MasterView } from "./masterView";
import { FourOhFour } from "./pages/fourOhFour";
import { StackPanel } from "./panels/stackPanel";
import { Playground } from "./playground";
import { MarkdownPage } from "./tutorial/markdownPage";
import { Tutorial } from "./tutorial/tutorial";

export const MainRouter = () => (
  <Switch>
    <Route exact={true} path="/" component={RedirectTo} />
    <Route exact={true} path="/getStarted" component={GetStarted} />
    <Route exact={true} path="/learn" component={Tutorial} />
    <Route exact={true} path="/login" component={LoginContainer} />
    <Route exact={true} path="/select" component={SelectCourseViewContainer} />
    <Route exact={true} path="/play" component={MasterView} />
    <Route exact={true} path="/404" component={FourOhFour} />
    <Route exact={true} path="/playground" component={Playground} />
    <Route exact={true} path="/tospp" component={Page(RawTosppUrl)} />
    <Route exact={true} path="/about" component={Page(RawReadmeUrl)} />
    <Route exact={true} path="/fgo" component={FgoViewContainer} />
  </Switch>
);

const RedirectTo = () => {
  return <Redirect push={true} to="/getStarted" />;
};

const width = 0.9 * window.innerWidth;
const height = 0.825 * window.innerHeight;

const Page = (src: string) => {
  return () => (
    <StackPanel orientation="vertical" horizontalAlignment="center">
      <MarkdownPage width={width} height={height} src={src} /> {""}
    </StackPanel>
  );
};
