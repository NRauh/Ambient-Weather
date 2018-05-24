import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import './Weather.css';

export default class Weather extends React.Component {
  render() {
    return (
      <div className="weather">
        <div className="weather__icon">
          <img
            src="https://placekitten.com/250/250"
            alt="Weather Icon"
          />
        </div>

        <div className="weather__info">
          <h1>68 - Sunny</h1>
          <h2>Location</h2>
        </div>

        <div className="weather__forecast">
          <hr className="currentColor" />

          <List>
            <ListItem
              primaryText="00:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="04:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="08:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="12:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="16:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="20:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
            <ListItem
              primaryText="00:00 - Condition"
              leftAvatar={<Avatar backgroundColor="grey" />}
            />
          </List>
        </div>
      </div>
    );
  }
}
