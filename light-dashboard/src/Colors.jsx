import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import ColorPicker from './ColorPicker';

export default class Colors extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggleDialog = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <h1>Color Selection</h1>

        <List>
          <ListItem primaryText="Clear" onClick={this.toggleDialog} />
          <ListItem primaryText="Few Clouds" />
          <ListItem primaryText="Scattered Clouds" />
          <ListItem primaryText="Broken Clouds" />
          <ListItem primaryText="Shower Rain" />
          <ListItem primaryText="Rain" />
          <ListItem primaryText="Thunderstorm" />
          <ListItem primaryText="Snow" />
          <ListItem primaryText="Mist" />
          <ListItem primaryText="Sever Weather" />
        </List>

        <RaisedButton label="Apply" primary />
        <RaisedButton label="Cycle" secondary />
        <RaisedButton label="Manual" secondary />

        <Dialog
          open={this.state.open}
          onRequestClose={this.toggleDialog}
        >
          <ColorPicker />
        </Dialog>
      </div>
    );
  }
}
