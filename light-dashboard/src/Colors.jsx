import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import ColorPicker from './ColorPicker';
import Avatar from 'material-ui/Avatar';

export default class Colors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      colorToUpdate: '',
      colors: {
        clear: 'yellow',
        fewClouds: 'orange',
        scatteredClouds: 'green',
        brokenClouds: 'lime',
        showerRain: 'grey',
        rain: 'darkgrey',
        thunderstorm: 'purple',
        snow: 'antiquewhite',
        mist: 'indigo',
        severWeather: 'red',
      },
    };
  }

  toggleDialog = (weatherType) => {
    return () => this.setState({
      colorToUpdate: weatherType,
      dialogOpen: !this.state.dialogOpen,
    });
  };

  updateColor = (color) => {
    const newColors = {...this.state.colors};
    newColors[this.state.colorToUpdate] = color.hex;
    this.setState({ colors: newColors });
  }

  render() {
    const dialogButtons = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.toggleDialog(undefined)}
      />,
      <FlatButton
        label="Set"
        primary
        onClick={this.toggleDialog(undefined)}
      />,
    ];

    return (
      <div>
        <h1>Color Selection</h1>

        <List>
          <ListItem
            primaryText="Clear"
            onClick={this.toggleDialog('clear')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.clear} />}
          />
          <ListItem
            primaryText="Few Clouds"
            onClick={this.toggleDialog('fewClouds')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.fewClouds} />}
          />
          <ListItem
            primaryText="Scattered Clouds"
            onClick={this.toggleDialog('scatteredClouds')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.scatteredClouds} />}
          />
          <ListItem
            primaryText="Broken Clouds"
            onClick={this.toggleDialog('brokenClouds')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.brokenClouds} />}
          />
          <ListItem
            primaryText="Shower Rain"
            onClick={this.toggleDialog('showerRain')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.showerRain} />}
          />
          <ListItem
            primaryText="Rain"
            onClick={this.toggleDialog('rain')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.rain} />}
          />
          <ListItem
            primaryText="Thunderstorm"
            onClick={this.toggleDialog('thunderstorm')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.thunderstorm} />}
          />
          <ListItem
            primaryText="Snow"
            onClick={this.toggleDialog('snow')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.snow} />}
          />
          <ListItem
            primaryText="Mist"
            onClick={this.toggleDialog('mist')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.mist} />}
          />
          <ListItem
            primaryText="Sever Weather"
            onClick={this.toggleDialog('severWeather')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.severWeather} />}
          />
        </List>

        <RaisedButton label="Apply" primary />
        <RaisedButton label="Cycle" secondary />
        <RaisedButton label="Manual" secondary />

        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={this.toggleDialog(undefined)}
          actions={dialogButtons}
        >
          <ColorPicker
            onChangeComplete={this.updateColor}
            color={this.state.colors[this.state.colorToUpdate]}
          />
        </Dialog>
      </div>
    );
  }
}
