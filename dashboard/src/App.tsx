import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage, WeatherProps } from './WeatherPage';

interface AppState {
  page: number;
  weather: WeatherProps;
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
  };

  constructor(props: any) {
    super(props);
  }

  changePage = (event: any, value: number) => {
    this.setState({ page: value });
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
