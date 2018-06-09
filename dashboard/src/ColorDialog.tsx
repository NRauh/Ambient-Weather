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
import { Color } from './types';


export interface ColorPickerProps {
  color: Color
  onRedChange?: (event: any) => void;
  onGreenChange?: (event: any) => void;
  onBlueChange?: (event: any) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const previewStyles = {
    backgroundColor: `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})`,
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
          value={props.color.red}
          onChange={props.onRedChange}
          type="number"
        />
        <TextField
          id="green"
          label="Green"
          value={props.color.green}
          onChange={props.onGreenChange}
          type="number"
        />
        <TextField
          id="blue"
          label="Blue"
          value={props.color.blue}
          onChange={props.onBlueChange}
          type="number"
        />
      </div>
    </div>
  );
};

export interface SetColorDialogProps {
  dialogOpen: boolean;
  forCondition: keyof ConditionColorListState;
  color: Color;
  onDialogClose: (save: boolean) => void;
  onColorChange: (value: Color) => void;
}

export class ColorDialog extends React.Component<SetColorDialogProps> {
  constructor(props: SetColorDialogProps) {
    super(props);
  }

  dialogClose = (shouldSave: boolean) => {
    return () => {
      this.props.onDialogClose(shouldSave);
    };
  }

  changeColor = (field: keyof Color) => {
    return (e: any) => {
      const newColor: Color = {
        ...this.props.color,
        [field]: parseInt(e.target.value, 10),
      };
      this.props.onColorChange(newColor);
    }
  }

  render() {
    return (
      <Dialog
        open={(this.props as SetColorDialogProps).dialogOpen}
        onClose={this.dialogClose(false)}
      >
        <DialogTitle>Set {(this.props as SetColorDialogProps).forCondition}</DialogTitle>
        <DialogContent>
          <ColorPicker
            color={this.props.color}
            onRedChange={this.changeColor('red')}
            onGreenChange={this.changeColor('green')}
            onBlueChange={this.changeColor('blue')}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.dialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.dialogClose(true)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
