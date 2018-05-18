import * as React from 'react';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class Preferences extends React.Component {
  render() {
    return (
      <div>
        <h1>Preferences</h1>

        <TextField floatingLabelText="Postal Code" />

        <RadioButtonGroup name="unit" defaultSelected="metric">
          <RadioButton value="metric" label="Metric" />
          <RadioButton value="us" label="US" />
        </RadioButtonGroup>

        <TextField floatingLabelText="Device Hostname" />
      </div>
    );
  }
}
