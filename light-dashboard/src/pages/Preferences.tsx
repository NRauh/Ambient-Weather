import * as React from 'react';
import {
  TextField,
  RadioButtonGroup,
  RadioButton,
  RaisedButton,
} from 'material-ui';
import { Settings } from '../store/types';
import { store, getSettings, saveSettings } from '../store';

interface PreferencesPageState {
  settings: Settings;
  previousSettings: Settings;
}

export default class Preferences extends React.Component {
  state: PreferencesPageState = {
    settings: {
      unit: null,
      location: '',
      hostname: '',
    },
    previousSettings: {
      unit: null,
      location: '',
      hostname: '',
    },
  };

  constructor(props) {
    super(props);

    store.subscribe(() => {
      const currentState = store.getState();
      this.setState({
        settings: currentState.settings,
        previousSettings: currentState.settings,
      });
    });
    getSettings();
  }

  saveSettings = () => {
    saveSettings(this.state.settings);
  }

  resetSettings = () => {
    this.setState({
      settings: this.state.previousSettings,
    });
  }

  handleChange = (e, value) => {
    const updated = { [e.target.name]: value };
    this.setState({
      settings: {
        ...this.state.settings,
        ...updated,
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Preferences</h1>

        <div>
          <RaisedButton onClick={this.saveSettings} primary label="Save" />
          <RaisedButton onClick={this.resetSettings} secondary label="Reset" />
        </div>

        <TextField
          name="location"
          value={this.state.settings.location}
          onChange={this.handleChange}
          floatingLabelText="Postal Code"
        />

        <RadioButtonGroup
          name="unit"
          valueSelected={this.state.settings.unit}
          onChange={this.handleChange}
        >
          <RadioButton value="si" label="Metric (SI)" />
          <RadioButton value="us" label="US" />
        </RadioButtonGroup>

        <TextField
          name="hostname"
          value={this.state.settings.hostname}
          onChange={this.handleChange}
          floatingLabelText="Device Hostname"
        />
      </div>
    );
  }
}
