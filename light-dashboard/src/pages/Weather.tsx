import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import './Weather.css';
import { WeatherReport, Colors } from '../store/types';
import { store, getWeather } from '../store';

interface WeatherPageState {
  weather: WeatherReport;
  colors: Colors;
}

export default class Weather extends React.Component {
  state: WeatherPageState = {
    weather:  {
      color: null,
      temperature: null,
      time: null,
      hourly: [],
    },
    colors: {},
  };

  constructor(props) {
    super(props);

    store.subscribe(() => {
      const currentState = store.getState();
      this.setState({
        weather: currentState.weather,
        colors: currentState.colors,
      });
    });

    getWeather();
  }

  conditionNice(condition: keyof Colors): string {
    switch (condition) {
      case 'clear':
        return 'Clear';
      case 'rain':
        return 'Rainy';
      case 'snow':
        return 'Snowy';
      case 'wind':
        return 'Windy';
      case 'fog':
        return 'Foggy';
      case 'cloudy':
        return 'Cloudy';
      case 'partlyCloudy':
        return 'Partly Cloudy';
      default:
        return '';
    }
  }

  forecastList() {
    return this.state.weather.hourly.map((hour, index) => {
      const itemText = `${hour.time} - ${this.conditionNice(hour.color)}`;
      return (
        <ListItem
          key={index}
          primaryText={itemText}
          leftAvatar={<Avatar backgroundColor={this.state.colors[hour.color]} />}
        />
      );
    });
  }

  render() {
    const nowbarColor = {
      backgroundColor: this.state.colors[this.state.weather.color],
    };

    return (
      <div className="weather">
        <div className="weather__icon">
          <img
            src="https://placekitten.com/250/250"
            alt="Weather Icon"
          />
        </div>

        <div className="weather__info">
          <h1>{this.state.weather.temperature} - {this.conditionNice(this.state.weather.color)}</h1>
          <i>As of {this.state.weather.time}</i>
        </div>

        <div className="weather__forecast">
          <hr className="weather__forecast__nowbar" style={nowbarColor} />

          <List>
            {this.forecastList()}
          </List>
        </div>
      </div>
    );
  }
}
