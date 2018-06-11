import * as React from 'react';
import './Weather.css';
import { WeatherIcon } from './WeatherIcon';
import { WeatherInfo } from './WeatherInfo';
import { WeatherForecast } from './WeatherForecast';
import { DashboardState, WeatherState } from '../store';
import { connect } from 'react-redux';
import { ConditionList } from '@light/types';

interface WeatherPageProps extends WeatherState {
  colors: ConditionList,
}

const WeatherPage = (props: WeatherPageProps) => (
  <div className="weather">
    <WeatherIcon />
    <WeatherInfo
      human={props.current.human}
      temperature={props.current.temperature}
      condition={props.current.condition}
      time={props.current.time}
    />
    <WeatherForecast
      forecast={props.forecast}
      colors={props.colors}
    />
  </div>
);

const mapStateToProps = (state: DashboardState) => {
  return {
    current: state.weather.current,
    forecast: state.weather.forecast,
    colors: state.conditionColors,
  };
};

export default connect(mapStateToProps)(WeatherPage);
