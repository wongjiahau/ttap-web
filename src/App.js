import React, {Component} from 'react';
import {MuiThemeProvider} from 'material-ui'
import {Login} from './pages/Login'
import AppBar from 'material-ui/AppBar'

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          className="App-header"
          title="Timetable Arranging Program (UTAR)"
          iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <br/>
        <Login/>
      </MuiThemeProvider>
    )
  }
}
