import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage, WeatherProps } from './WeatherPage';
import { SettingsPage, SettingsPageState } from './SettingsPage';

interface AppState {
  page: number;
  weather: WeatherProps;
  settings: SettingsPageState;
  previousSettings?: SettingsPageState;
}

class App extends React.Component {
  state: AppState = {
    page: 0,
    weather: {
      temperature: 68,
      condition: 'Clear',
      time: 1000000,
      forecast: [
        {
          temperature: 58,
          condition: 'Rainy',
          time: 1000000,
        },
        {
          temperature: 58,
          condition: 'Foggy',
          time: 1000000,
        },
        {
          temperature: 58,
          condition: 'Snowy',
          time: 1000000,
        },
        {
          temperature: 58,
          condition: 'Partly Cloudy',
          time: 1000000,
        },
        {
          temperature: 58,
          condition: 'Cloudy',
          time: 1000000,
        },
      ],
    },
    settings: {
      lat: '0.0',
      long: '0.0',
      unit: 'SI',
      hostname: 'hello-led',
    },
    previousSettings: undefined,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      previousSettings: this.state.settings,
    });
  }

  changePage = (event: any, value: number) => {
    this.setState({ page: value });
  }

  updateSettings = (setting: keyof SettingsPageState) => {
    return (event: any) => {
      const newSettings = { ...this.state.settings };
      newSettings[setting] = event.target.value
      this.setState({ settings: newSettings });
    }
  }

  resetSettings = () => {
    this.setState({
      settings: this.state.previousSettings,
    });
  }

  saveSettings = () => {
    console.log('i will save', this.state.settings.valueOf());
    this.setState({
      previousSettings: this.state.settings,
    });
  }

  getCurrentLocation = () => {
    console.log('i will get the location');
  }

  currentPage = () => {
    if (this.state.page === 0) {
      return (
        <WeatherPage
          temperature={this.state.weather.temperature}
          condition={this.state.weather.condition}
          time={this.state.weather.time}
          forecast={this.state.weather.forecast}
        />
      );
    } else if (this.state.page === 2) {
      return (
        <SettingsPage
          lat={this.state.settings.lat}
          long={this.state.settings.long}
          unit={this.state.settings.unit}
          hostname={this.state.settings.hostname}
          onLatChange={this.updateSettings('lat')}
          onLongChange={this.updateSettings('long')}
          onUnitChange={this.updateSettings('unit')}
          onHostnameChange={this.updateSettings('hostname')}
          onResetClick={this.resetSettings}
          onSaveClick={this.saveSettings}
          onUseCurrentLocationClick={this.getCurrentLocation}
        />
      );
    } else {
      return;
    }
  }

  public render() {
    return (
      <div className="App">
        {this.currentPage()}

        <Navbar
          page={this.state.page}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

export default App;
