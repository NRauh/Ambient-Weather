import * as React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { UnitOptions } from '@light/types';

export interface UnitSelectionProps {
  unit: UnitOptions;
  onUnitChange: (event: any) => void;
}

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
