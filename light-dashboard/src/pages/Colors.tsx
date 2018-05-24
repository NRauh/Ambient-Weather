import * as React from 'react';
import {
  RaisedButton,
  FlatButton,
  List,
  ListItem,
  Dialog,
  Avatar,
} from 'material-ui';
import {
  store,
  getColors,
  // updateColors,
  updateSingleColor,
} from '../store';
import { ColorPicker } from '../components';
import { Colors } from '../store/types';

interface ColorsPageState {
  dialogOpen: boolean;
  colorToUpdate: keyof Colors;
  pendingColor: string;
  colors: Colors;
}

export default class ColorsPage extends React.Component {
  state: ColorsPageState = {
    dialogOpen: false,
    colorToUpdate: null,
    pendingColor: null,
    colors: {
      clear: '#ccc',
      wind: '#bbb',
      partlyCloudy: '#aaa',
      cloudy: '#000',
      rain: '#999',
      snow: '#888',
      fog: '#777',
    },
  };

  constructor(props) {
    super(props);

    store.subscribe(() => {
      this.setState({ colors: store.getState().colors });
    });

    getColors();
  }

  openDialog = (weatherType: keyof Colors) => {
    return () => this.setState({
      colorToUpdate: weatherType,
      pendingColor: this.state.colors[weatherType],
      dialogOpen: true,
    });
  }

  closeDialog = (save) => {
    return () => {
      if (save) {
        updateSingleColor(this.state.colorToUpdate, this.state.pendingColor)
      }

      this.setState({
        pendingColor: null,
        colorToUpdate: null,
        dialogOpen: false,
      });
    }
  }

  updatePendingColor = (color) => {
    this.setState({ pendingColor: color.hex });
  }

  render() {
    const dialogButtons = [
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.closeDialog(false)}
      />,
      <FlatButton
        label="Set"
        primary
        onClick={this.closeDialog(true)}
      />,
    ];

    return (
      <div>
        <h1>Color Selection</h1>

        <List>
          <ListItem
            primaryText="Clear"
            onClick={this.openDialog('clear')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.clear} />}
          />
          <ListItem
            primaryText="Wind"
            onClick={this.openDialog('wind')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.wind} />}
          />
          <ListItem
            primaryText="Partly Cloudy"
            onClick={this.openDialog('partlyCloudy')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.partlyCloudy} />}
          />
          <ListItem
            primaryText="Cloudy"
            onClick={this.openDialog('cloudy')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.cloudy} />}
          />
          <ListItem
            primaryText="Rain"
            onClick={this.openDialog('rain')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.rain} />}
          />
          <ListItem
            primaryText="Snow"
            onClick={this.openDialog('snow')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.snow} />}
          />
          <ListItem
            primaryText="Fog"
            onClick={this.openDialog('fog')}
            leftAvatar={<Avatar backgroundColor={this.state.colors.fog} />}
          />
        </List>

        {/* <RaisedButton label="Cycle" primary />
        <RaisedButton label="Manual" primary /> */}

        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog(false)}
          actions={dialogButtons}
        >
          <ColorPicker
            onChangeComplete={this.updatePendingColor}
            color={this.state.pendingColor}
          />
        </Dialog>
      </div>
    );
  }
}
