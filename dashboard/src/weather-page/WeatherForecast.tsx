import * as React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { WeatherStatus } from '@light/types';

export interface WeatherForecastProps {
  forecast: WeatherStatus[],
}

export const WeatherForecast = (props: WeatherForecastProps) => ( 
  <List className="weather__forecast">
    {props.forecast.map((weather: any, index: number) => (
      <ListItem button={true} key={index}>
        <ListItemText primary={weather.condition} />
      </ListItem>
    ))}
  </List>
);
