import * as React from 'react';
import { Button } from '@material-ui/core';

export interface SettingsControlsProps {
  onSaveClick: (event: any) => void;
  onResetClick: (event: any) => void;
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
