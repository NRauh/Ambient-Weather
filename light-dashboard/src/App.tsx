import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import wbSunny from 'material-ui/svg-icons/image/wb-sunny';
import colorLens from 'material-ui/svg-icons/image/color-lens';
import settings from 'material-ui/svg-icons/action/settings';
import Weather from './Weather';
import Colors from './Colors';
import Preferences from './Preferences';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Tabs>
          <Tab
            icon={<Sunny />}
            label="Weather"
          >
            <Weather />
          </Tab>

          <Tab
            icon={<ColorLens />}
            label="Colors"
          >
            <Colors />
          </Tab>

          <Tab
            icon={<Settings />}
            label="Preferences"
          >
            <Preferences />
          </Tab>
        </Tabs>
      </MuiThemeProvider>
    );
  }
}
