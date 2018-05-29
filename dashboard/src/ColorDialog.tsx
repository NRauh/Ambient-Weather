import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ConditionColorListState } from './ColorsPage';

export interface SetColorDialogState {
  dialogOpen: boolean;
  forCondition?: keyof ConditionColorListState;
}

export interface SetColorDialogProps extends SetColorDialogState {
  onDialogClose: (save: boolean) => (event: any) => void;
}


export const SetColorDialog = (props: SetColorDialogProps) => (
  <Dialog
    open={props.dialogOpen}
    onClose={props.onDialogClose(false)}
  >
    <DialogTitle>Set Color</DialogTitle>
    <DialogContent>
      <h2>Updaing color {props.forCondition}</h2>
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
