import * as React from 'react';
import { List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import { WeatherStatus, ConditionList } from '@light/types';
import { colorStyles } from '../colors-page/ConditionColorList';

export interface WeatherForecastProps {
  forecast: WeatherStatus[],
  colors: ConditionList,
}

export const WeatherForecast = (props: WeatherForecastProps) => ( 
  <List className="weather__forecast">
    {props.forecast.map((weather: WeatherStatus, index: number) => (
      <ListItem button={true} key={index}>
        <Avatar style={colorStyles(props.colors[weather.condition])} />
        <ListItemText primary={weather.condition} />
      </ListItem>
    ))}
  </List>
);
