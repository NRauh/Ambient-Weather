import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage, WeatherProps } from './WeatherPage';
import SettingsPage from './SettingsPage';
import { ColorsPage, ConditionColorListState } from './ColorsPage';
import { SetColorDialogState, ColorPickerState } from './ColorDialog';
import { DashboardState } from './store/store';
import { connect } from 'react-redux';

interface AppState {
  weather: WeatherProps;
  conditionColors: ConditionColorListState,
  colorDialog: SetColorDialogState,
}

interface AppProps {
  page: number;
}

class App extends React.Component<any, any> {
  state: AppState = {
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

  constructor(props: AppProps) {
    super(props);
  }

  changeColor = (color: keyof ColorPickerState) => {
    return (event: any) => {
      const newColor: SetColorDialogState = { ...this.state.colorDialog };
      newColor[color] = event.target.value;
      this.setState({ colorDialog: newColor });
    };
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
    if (this.props.page === 0) {
      return (
        <WeatherPage
          temperature={this.state.weather.temperature}
          condition={this.state.weather.condition}
          time={this.state.weather.time}
          forecast={this.state.weather.forecast}
        />
      );
    } else if (this.props.page === 1) {
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
    } else if (this.props.page === 2) {
      return (
        <SettingsPage />
      );
    } else {
      return;
    }
  }

  public render() {
    return (
      <div className="App">
        {this.currentPage()}

        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    page: state.app.page,
  };
};

export default connect(mapStateToProps)(App);
