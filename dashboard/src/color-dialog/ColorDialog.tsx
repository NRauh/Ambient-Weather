import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Color, ConditionList } from '@light/types';
import { ColorPicker } from './ColorPicker';

export interface SetColorDialogProps {
  dialogOpen: boolean;
  forCondition: keyof ConditionList;
  color: Color;
  onDialogClose: (save: boolean) => void;
  onColorChange: (value: Color) => void;
}

export class ColorDialog extends React.Component<SetColorDialogProps, any> {
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
        open={this.props.dialogOpen}
        onClose={this.dialogClose(false)}
      >
        <DialogTitle>Set {this.props.forCondition}</DialogTitle>
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
