import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage, WeatherProps } from './WeatherPage';
import SettingsPage from './SettingsPage';
import ColorsPage  from './ColorsPage';
import { DashboardState } from './store/store';
import { connect } from 'react-redux';

interface AppState {
  weather: WeatherProps;
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
  };

  constructor(props: AppProps) {
    super(props);
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
        <ColorsPage />
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
