import GridIcon from "material-ui-icons/GridOn";
import MenuIcon from "material-ui-icons/Menu";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import {HashRouter as Router} from "react-router-dom";
import "react-tippy/dist/tippy.css";
import {GetFeedbackDialog} from "./getFeedbackDialog";
import { MainRouter } from "./mainRouter";
import { OtherStuffDrawer } from "./otherStuffDrawer";
// import {DrawerContent} from "./DrawerContent"; import {Main} from "./Main";

const theme = createMuiTheme();
interface IAppState {
    isSecondaryDrawerOpen: boolean;
}
export class App extends React.Component < {}, IAppState > {
    public constructor(props) {
        super(props);
        this.state = {
            isSecondaryDrawerOpen: false
        };
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
                                <GridIcon style={{ marginRight: "12px", color: "white" }}/>
                                <Typography style={{ flex: 1 }} type="title" color="inherit">
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
        // raised={true} onClick={this.handleCloseDrawer}>         hide drawer
        // </Button>     {/* < DrawerContent onItemClick={this.handleCloseDrawer}/> */}
        // </Drawer> <GetFeedbackDialog/> {/* <Main/> */}
    }
}
