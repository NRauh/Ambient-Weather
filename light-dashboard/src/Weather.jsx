import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class Weather extends Component {
  render() {
    const styles = {
      container: {
        display: 'grid',
        gridTemplateAreas: `
          "icon info"
          "forecast forecast"
        `
      },
      weatherIcon: {
        gridArea: 'icon',
      },
      weatherInfo: {
        gridArea: 'info',
      },
      weatherForecast: {
        gridArea: 'forecast',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.weatherIcon}>
          <img
            src="https://placekitten.com/250/250"
            alt="Weather Icon"
          />
        </div>

        <div className="right" style={styles.weatherInfo}>
          <h1>68 - Sunny</h1>
          <h2>Location</h2>
        </div>

        <div className="full" style={styles.weatherForecast}>
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
