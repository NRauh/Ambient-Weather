import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ConditionColorListState } from '../ColorsPage';
import { Color } from '@light/types';
import { ColorPicker } from './ColorPicker';

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
