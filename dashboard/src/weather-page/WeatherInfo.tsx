import * as React from 'react';
import { WeatherStatus } from '@light/types';
import { Typography } from '@material-ui/core';

export const WeatherInfo = (props: WeatherStatus) => (
  <div className="weather__info">
    <Typography variant="display2">{props.temperature} - {props.condition}</Typography>
    <Typography variant="subheading">As of {props.time}</Typography>
  </div>
);
