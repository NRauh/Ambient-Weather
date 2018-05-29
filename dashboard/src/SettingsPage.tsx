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

export interface SettingsPageProps extends SettingsControlsProps, LocationInputProps, UnitSelectionProps, HostnameProps {
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

export const SettingsPage = (props: SettingsPageProps) => (
  <div className="settings">
    <h1>Settings</h1>
    <SettingsControls
      onResetClick={props.onResetClick}
      onSaveClick={props.onSaveClick}
    />
    <LocationInput
      onLatChange={props.onLatChange}
      onLongChange={props.onLongChange}
      onUseCurrentLocationClick={props.onUseCurrentLocationClick}
      lat={props.lat}
      long={props.long}
    />
    <UnitSelection
      unit={props.unit}
      onUnitChange={props.onUnitChange}
    />
    <HostnameInput
      hostname={props.hostname}
      onHostnameChange={props.onHostnameChange}
    />
  </div>
);
