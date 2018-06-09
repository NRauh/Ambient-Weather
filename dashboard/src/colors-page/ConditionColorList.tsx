import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { Color, ConditionList } from '@light/types';

export function colorStyles(color: Color) {
  const styles = {
    backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
  };
  return styles;
}

export interface ConditionColorListProps {
  conditions: ConditionList,
  onColorClick: (condition: keyof ConditionList) => (event: any) => void;
}

export const ConditionColorList = (props: ConditionColorListProps) => ( 
  <List>
    <ListItem button={true} onClick={props.onColorClick('clear')}>
      <Avatar style={colorStyles(props.conditions.clear)} />
      <ListItemText primary="Clear" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('windy')}>
      <Avatar style={colorStyles(props.conditions.windy)} />
      <ListItemText primary="Windy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('partlyCloudy')}>
      <Avatar style={colorStyles(props.conditions.partlyCloudy)} />
      <ListItemText primary="Partly Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('cloudy')}>
      <Avatar style={colorStyles(props.conditions.cloudy)} />
      <ListItemText primary="Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('rain')}>
      <Avatar style={colorStyles(props.conditions.rain)} />
      <ListItemText primary="Rain" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('snow')}>
      <Avatar style={colorStyles(props.conditions.snow)} />
      <ListItemText primary="Snow" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('fog')}>
      <Avatar style={colorStyles(props.conditions.fog)} />
      <ListItemText primary="Fog" />
    </ListItem>
  </List>
);
