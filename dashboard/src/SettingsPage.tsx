import * as React from 'react';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { DashboardState } from './store/store';
import { SETTINGS_ACTIONS } from './store/settings.reducer';

export interface SettingsControlsProps {
  onSaveClick: (event: any) => void;
  onResetClick: (event: any) => void;
}

export interface LocationInputState {
  lat: string;
  long: string;
}

export interface LocationInputProps extends LocationInputState {
  onLatChange: (event: any) => void;
  onLongChange: (event: any) => void;
  onUseCurrentLocationClick: (event: any) => void;
}

export interface UnitSelectionState {
  unit: 'US' | 'SI';
}

export interface UnitSelectionProps extends UnitSelectionState {
  onUnitChange: (event: any) => void;
}

export interface HostnameState {
  hostname: string;
}

export interface HostnameProps extends HostnameState {
  onHostnameChange: (event: any) => void;
}

export interface SettingsPageState extends LocationInputState, UnitSelectionState, HostnameState {
}

export interface SettingsPageProps {
  settings: SettingsPageState;
  onSave: (event: SettingsPageState) => void;
}


export const SettingsControls = (props: SettingsControlsProps) => (
  <div>
    <Button
      variant="raised"
      color="primary"
      onClick={props.onSaveClick}
    >
      Save Settings
    </Button>
    <Button
      variant="raised"
      color="default"
      onClick={props.onResetClick}
    >
      Revert Settings
    </Button>
  </div>
);

export const LocationInput = (props: LocationInputProps) => (
  <div>
    <TextField
      id="lat"
      label="Lat"
      value={props.lat}
      onChange={props.onLatChange}
    />
    <TextField
      id="long"
      label="Long"
      value={props.long}
      onChange={props.onLongChange}
    />
    <Button
      variant="raised"
      color="primary"
      onClick={props.onUseCurrentLocationClick}
    >
      Use current location
    </Button>
  </div>
);

export const UnitSelection = (props: UnitSelectionProps) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Units</FormLabel>
    <RadioGroup
      aria-label="units"
      name="units"
      value={props.unit}
      onChange={props.onUnitChange}
    >
      <FormControlLabel
        value="US"
        control={<Radio color="primary" />}
        label="US"
      />
      <FormControlLabel
        value="SI"
        control={<Radio color="primary" />}
        label="SI (Metric)"
      />
    </RadioGroup>
  </FormControl>
);

export const HostnameInput = (props: HostnameProps) => (
  <div>
    <TextField
      id="hostname"
      label="Hostname"
      value={props.hostname}
      onChange={props.onHostnameChange}
    />
  </div>
);

class SettingsPage extends React.Component {
  state: {
    settings: SettingsPageState,
    previousSettings: SettingsPageState,
  };

  constructor(props: SettingsPageProps) {
    super(props);

    this.state = {
      previousSettings: { ...props.settings },
      settings: { ...props.settings }
    };
  }

  updateSettings = (setting: keyof SettingsPageState) => {
    return (event: any) => {
      this.setState({
        settings: {
          ...this.state.settings,
          [setting]: event.target.value
        }
      });
    }
  };

  resetChanges = () => {
    this.setState({
      settings: { ...this.state.previousSettings },
    });
  };

  saveSettings = () => {
    console.log('will save', this.state.settings);
    (this.props as SettingsPageProps).onSave(this.state.settings);
  }

  getCurrentLocation = () => {
    console.log('will get current location');
  };

  render() {
    return (
      <div className="settings">
        <h1>Settings</h1>
        <SettingsControls
          onResetClick={this.resetChanges}
          onSaveClick={this.saveSettings}
        />
        <LocationInput
          onLatChange={this.updateSettings('lat')}
          onLongChange={this.updateSettings('long')}
          onUseCurrentLocationClick={this.getCurrentLocation}
          lat={this.state.settings.lat}
          long={this.state.settings.long}
        />
        <UnitSelection
          unit={this.state.settings.unit}
          onUnitChange={this.updateSettings('unit')}
        />
        <HostnameInput
          hostname={this.state.settings.hostname}
          onHostnameChange={this.updateSettings('hostname')}
        />
      </div>
    );
  };
}

const mapStateToProps = (state: DashboardState) => {
  return {
    settings: {
      lat: state.settings.lat,
      long: state.settings.long,
      unit: state.settings.unit,
      hostname: state.settings.hostname,
    },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSave: (event: SettingsPageState) => {
      const action = {
        type: SETTINGS_ACTIONS.SET_ALL_SETTINGS,
        value: event,
      };

      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
