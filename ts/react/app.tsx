import GridIcon from "material-ui-icons/GridOn";
import MenuIcon from "material-ui-icons/Menu";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import indigo from "material-ui/colors/indigo";
import pink from "material-ui/colors/pink";
import IconButton from "material-ui/IconButton";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import * as React from "react";
import {HashRouter as Router} from "react-router-dom";
import {GetFeedbackDialog} from "./getFeedbackDialog";
import { MainRouter } from "./mainRouter";
import { OtherStuffDrawer } from "./otherStuffDrawer";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink ,
  },
});
interface IAppState {
    isSecondaryDrawerOpen: boolean;
}
function RemoveLoadingCube() {
    const x = document.getElementById("initialLoadingCube");
    if (x) {
        x.parentNode.removeChild(x);
    }
}
export class App extends React.Component < {}, IAppState > {
    public constructor(props) {
        super(props);
        this.state = {
            isSecondaryDrawerOpen: false
        };
        RemoveLoadingCube();
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
