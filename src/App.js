import AppBar from 'material-ui/AppBar';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import React, {Component} from 'react';
import {DrawerContent} from './DrawerContent';
import {GetFeedbackDialog} from './core/react/getFeedbackDialog';
import {HashRouter as Router} from 'react-router-dom';
import {Main} from './Main';
import 'react-tippy/dist/tippy.css'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecondaryDrawerOpened: false
    };
  }

  handleOpen = () => this.setState({isSecondaryDrawerOpened: true});
  handleClose = () => this.setState({isSecondaryDrawerOpened: false});
  render() {
    const menuButton = (
      <IconButton onClick={this.handleOpen}>
        <MenuIcon/>
      </IconButton>
    )
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
              className="App-header"
              title="Timetable Arranging Program (UTAR)"
              iconElementLeft={< p > </p >}
              iconElementRight={menuButton}/>
            <br/>
            <Drawer
              width={200}
              docked={false}
              openSecondary={true}
              open={this.state.isSecondaryDrawerOpened}Drawer >
              <RaisedButton
                label='hide drawer'
                fullWidth={true}
                secondary={true}
                icon={< ArrowForward />}
                onClick={this.handleClose}/>
              < DrawerContent onItemClick={this.handleClose}/>
            </Drawer>
            <GetFeedbackDialog/>
            <Main/>
            <br/>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}