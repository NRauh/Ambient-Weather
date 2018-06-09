import * as React from 'react';
import { WeatherStatus } from '@light/types';

export const WeatherInfo = (props: WeatherStatus) => (
  <div className="weather__info">
    <h1>{props.temperature} - {props.condition}</h1>
    <i>As of {props.time}</i>
  </div>
);
