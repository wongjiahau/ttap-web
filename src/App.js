import AppBar from 'material-ui/AppBar';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import Drawer from 'material-ui/Drawer';
import DrawerContent from './DrawerContent';
import IconButton from 'material-ui/IconButton';
import Main from './Main';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import RaisedButton from 'material-ui/RaisedButton';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {MuiThemeProvider} from 'material-ui';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecondaryDrawerOpened: false
    };
  }

  handleOpen = () => this.setState({isSecondaryDrawerOpened: true});
  handleClose = () => this.setState({isSecondaryDrawerOpened: false});
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          className="App-header"
          title="Timetable Arranging Program (UTAR)"
          iconElementLeft={<p></p>}
          iconElementRight={< IconButton onClick = {
          this.handleOpen
        } > <MenuIcon/> </IconButton>}/>
        <br/>
        <Drawer
          width={200}
          docked={false}
          openSecondary={true}
          open={this.state.isSecondaryDrawerOpened}>
          <RaisedButton
            label='hide drawer'
            fullWidth={true}
            secondary={true}
            icon={<ArrowForward/>}
            onClick={this.handleClose}/>
            <DrawerContent/>
        </Drawer>
        <Main/>
      </MuiThemeProvider>
    )
  }
}
