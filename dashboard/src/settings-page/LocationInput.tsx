import * as React from 'react';
import { TextField, Button } from '@material-ui/core';

export interface LocationInputProps {
  lat: string;
  long: string;
  onLatChange: (event: any) => void;
  onLongChange: (event: any) => void;
  onUseCurrentLocationClick: (event: any) => void;
}

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
