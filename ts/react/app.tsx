import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";
import IconButton from "@material-ui/core/IconButton";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import GridIcon from "@material-ui/icons/GridOn";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import {HashRouter as Router} from "react-router-dom";
import {GetFeedbackDialog} from "./getFeedbackDialog";
import { MainRouter } from "./mainRouter";
import { OtherStuffDrawer } from "./otherStuffDrawer";

// The following line is to disable the TouchTipple effect of Material UI
// This is to increase ui responsiveness (e.g. from 2.25 seconds to 2.13 seconds)
// For more info, refer https://github.com/mui-org/material-ui/issues/240
// However, it is currently disable as it causes some unknown runtime error on ocassion
// TouchRipple.prototype.render = () => null;

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink ,
  },
});
interface IAppState {
    isSecondaryDrawerOpen: boolean;
}

export function ToggleLoadingScreen(loadingWord: string, work: () => void) {
    const x = document.getElementById("loading-words");
    if (x) {
        x.style.display =  "";

        const y = document.getElementById("loading-inner-word");
        if (y) {
            y.innerHTML = loadingWord + "<br> . . . . . .";
        }
        setTimeout(() => {
            work();
            x.style.display =  "none";
        }, 100 /*ms*/);
    }
}

export class App extends React.Component < {}, IAppState > {
    public constructor(props: {}) {
        super(props);
        this.state = {
            isSecondaryDrawerOpen: false
        };

        // hide loading words
        const x = document.getElementById("loading-words");
        if (x) {
            x.style.display = "none";
        }
    }

    public handleOpenDrawer = () => this.setState({isSecondaryDrawerOpen: true});
    public handleCloseDrawer = () => this.setState({isSecondaryDrawerOpen: false});
    public render() {
        const menuButton = (
            <IconButton onClick={this.handleOpenDrawer}>
                <MenuIcon/>
            </IconButton>
        );
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <AppBar position="static" style={{ width: "100%" }}>
                            <Toolbar>
                                <Button onClick={() => window.history.back()}>
                                    <ArrowBack style={{color: "white"}}/>
                                </Button>
                                {/* <GridIcon style={{ marginRight: "12px", color: "white" }}/> */}
                                <Typography style={{ flex: 1 }} variant="title" color="inherit">
                                    Timetable Arranging Program (UTAR)
                                </Typography>
                                <IconButton onClick={this.handleOpenDrawer} style={{ marginRight: "-12px", color: "white"}}>
                                    <MenuIcon style={{color: "white"}}/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <br/>
                        <OtherStuffDrawer isOpen={this.state.isSecondaryDrawerOpen} onItemClick={this.handleCloseDrawer}/>
                        <GetFeedbackDialog/>
                        <MainRouter/>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
        // <Drawer     width={200}     docked={false}     openSecondary={true}
        // open={this.state.isSecondaryDrawerOpened}Drawer >     <Button color="primary"
        // variant="contained" onClick={this.handleCloseDrawer}>         hide drawer
        // </Button>     {/* < DrawerContent onItemClick={this.handleCloseDrawer}/> */}
        // </Drawer> <GetFeedbackDialog/> {/* <Main/> */}
    }

    public componentDidMount() {
        const x = document.getElementById("loading-inner-word");
        if (x) {
            x.innerHTML
            = "Finding possible timetables <br> . . . . . .";
        }
    }
}
