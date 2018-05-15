import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Weather Light" showMenuIconButton={false} />
      </MuiThemeProvider>
    );
  }
}
