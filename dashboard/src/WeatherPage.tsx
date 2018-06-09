import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './Weather.css';
import { connect } from 'react-redux';
import { DashboardState } from './store/store';

export interface InfoProps {
  condition: string;
  temperature: number;
  time: number
}

export interface ForecastProps {
  forecast: InfoProps[]
}

export interface WeatherProps extends InfoProps, ForecastProps {
}

export const WeatherIcon = (props: any) => (
  <div className="weather__icon">
    <img alt="Weather Icon" src="https://placekitten.com/250/250" />
  </div>
);

export const WeatherInfo = (props: InfoProps) => (
  <div className="weather__info">
    <h1>{props.temperature} - {props.condition}</h1>
    <i>As of {props.time}</i>
  </div>
);

export const WeatherForecast = (props: ForecastProps) => ( 
  <List className="weather__forecast">
    {props.forecast.map((weather: any, index: number) => (
      <ListItem button={true} key={index}>
        <ListItemText primary={weather.condition} />
      </ListItem>
    ))}
  </List>
);

const WeatherPage = (props: WeatherProps) => (
  <div className="weather">
    <WeatherIcon />
    <WeatherInfo
      temperature={props.temperature}
      condition={props.condition}
      time={props.time}
    />
    <WeatherForecast forecast={props.forecast} />
  </div>
);

const mapStateToProps = (state: DashboardState) => {
  return {
    temperature: state.weather.temperature,
    condition: state.weather.condition,
    time: state.weather.time,
    forecast: state.weather.forecast,
  };
};

export default connect(mapStateToProps)(WeatherPage);
