import * as React from 'react';
import './Weather.css';
import { WeatherIcon } from './WeatherIcon';
import { WeatherInfo } from './WeatherInfo';
import { WeatherForecast } from './WeatherForecast';
import { DashboardState, WeatherState } from '../store';
import { connect } from 'react-redux';

const WeatherPage = (props: WeatherState) => (
  <div className="weather">
    <WeatherIcon />
    <WeatherInfo
      temperature={props.current.temperature}
      condition={props.current.condition}
      time={props.current.time}
    />
    <WeatherForecast forecast={props.forecast} />
  </div>
);

const mapStateToProps = (state: DashboardState) => {
  return {
    current: state.weather.current,
    forecast: state.weather.forecast,
  };
};

export default connect(mapStateToProps)(WeatherPage);
