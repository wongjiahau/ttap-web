import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {MuiThemeProvider} from 'material-ui'
import {Login} from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro"></p>
          <Login/>
        </div>
      </MuiThemeProvider>
    )
  }
}
