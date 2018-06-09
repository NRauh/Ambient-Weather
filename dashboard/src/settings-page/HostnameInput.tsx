import * as React from 'react';
import { TextField } from '@material-ui/core';

export interface HostnameProps {
  hostname: string;
  onHostnameChange: (event: any) => void;
}

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
