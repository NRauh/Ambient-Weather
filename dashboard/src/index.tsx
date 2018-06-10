import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ACTIONS } from './store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import lightblue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightblue[800],
    },
    secondary: {
      main: red[700],
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch({ type: ACTIONS.GET_WEATHER });
store.dispatch({ type: ACTIONS.GET_ALL_CONDITIONS });
store.dispatch({ type: ACTIONS.GET_ALL_SETTINGS });
