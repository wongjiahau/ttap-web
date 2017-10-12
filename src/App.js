import React, {Component} from 'react';
import {MuiThemeProvider} from 'material-ui'
import AppBar from 'material-ui/AppBar'
import {Link} from 'react-router-dom'
import Main from './Main'

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          className="App-header"
          title="Timetable Arranging Program (UTAR)"
          iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <br/>
        <Main/>
      </MuiThemeProvider>
    )
  }
}
