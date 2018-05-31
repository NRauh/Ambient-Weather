import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { ConditionColorListState } from './ColorsPage';

export interface ColorPickerState {
  red: number;
  green: number;
  blue: number;
}

export interface ColorPickerProps extends ColorPickerState {
  onRedChange?: (event: any) => void;
  onGreenChange?: (event: any) => void;
  onBlueChange?: (event: any) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const previewStyles = {
    backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
    width: '100%',
    height: '10rem',
  };

  return (
    <div>
      <div>
        <div style={previewStyles} />
      </div>
      <div>
        <TextField
          id="red"
          label="Red"
          value={props.red}
          onChange={props.onRedChange}
          type="number"
        />
        <TextField
          id="green"
          label="Green"
          value={props.green}
          onChange={props.onGreenChange}
          type="number"
        />
        <TextField
          id="blue"
          label="Blue"
          value={props.blue}
          onChange={props.onBlueChange}
          type="number"
        />
      </div>
    </div>
  );
};

export interface SetColorDialogState extends ColorPickerState {
  dialogOpen: boolean;
  forCondition?: keyof ConditionColorListState;
}

export interface SetColorDialogProps extends SetColorDialogState, ColorPickerProps {
  onColorChange: (color: keyof ColorPickerState) => (event: any) => void;
  onDialogClose: (save: boolean) => (event: any) => void;
}

export const SetColorDialog = (props: SetColorDialogProps) => (
  <Dialog
    open={props.dialogOpen}
    onClose={props.onDialogClose(false)}
  >
    <DialogTitle>Set {props.forCondition}</DialogTitle>
    <DialogContent>
      <ColorPicker
        red={props.red}
        green={props.green}
        blue={props.blue}
        onRedChange={props.onColorChange('red')}
        onGreenChange={props.onColorChange('green')}
        onBlueChange={props.onColorChange('blue')}
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={props.onDialogClose(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={props.onDialogClose(true)} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);
