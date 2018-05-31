import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage, WeatherProps } from './WeatherPage';
import { SettingsPage, SettingsPageState } from './SettingsPage';
import { ColorsPage, ConditionColorListState } from './ColorsPage';
import { SetColorDialogState, ColorPickerState } from './ColorDialog';

interface AppState {
  page: number;
  weather: WeatherProps;
  settings: SettingsPageState;
  previousSettings?: SettingsPageState;
  conditionColors: ConditionColorListState,
  colorDialog: SetColorDialogState,
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
    conditionColors: {
      clear: '#ddd',
      windy: '#ccc',
      partlyCloudy: '#bbb',
      cloudy: '#aaa',
      rain: '#999',
      snow: '#888',
      fog: '#777',
    },
    colorDialog: {
      dialogOpen: false,
      red: 7,
      green: 7,
      blue: 7,
    },
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

  changeColor = (color: keyof ColorPickerState) => {
    return (event: any) => {
      const newColor: SetColorDialogState = { ...this.state.colorDialog };
      newColor[color] = event.target.value;
      this.setState({ colorDialog: newColor });
    };
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

  openColorDialog = (condition: keyof ConditionColorListState) => {
    return (event: any) => {
      const openDialog: SetColorDialogState = {
        ...this.state.colorDialog,
        dialogOpen: true,
        forCondition: condition,
      };

      this.setState({ colorDialog: openDialog });
    };
  }

  closeColorDialog = (save: boolean) => {
    return (event: any) => {
      if (save) {
        console.log('i will save');
      }

      const closeDialog: SetColorDialogState = {
        ...this.state.colorDialog,
        dialogOpen: false,
        forCondition: undefined,
      };
      this.setState({ colorDialog: closeDialog });
    };
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
    } else if (this.state.page === 1) {
      return (
        <ColorsPage
          clear={this.state.conditionColors.clear}
          windy={this.state.conditionColors.windy}
          partlyCloudy={this.state.conditionColors.partlyCloudy}
          cloudy={this.state.conditionColors.cloudy}
          rain={this.state.conditionColors.rain}
          snow={this.state.conditionColors.snow}
          fog={this.state.conditionColors.fog}
          dialogOpen={this.state.colorDialog.dialogOpen}
          forCondition={this.state.colorDialog.forCondition}
          red={this.state.colorDialog.red}
          green={this.state.colorDialog.green}
          blue={this.state.colorDialog.blue}
          onColorChange={this.changeColor}
          onColorClick={this.openColorDialog}
          onDialogClose={this.closeColorDialog}
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
