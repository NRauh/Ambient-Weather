import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

export interface ConditionColorListState {
  clear: string;
  windy: string;
  partlyCloudy: string;
  cloudy: string;
  rain: string;
  snow: string;
  fog: string;
}

export interface ConditionColorListProps extends ConditionColorListState {
  onColorClick: (condition: keyof ConditionColorListState) => (event: any) => void;
}

export interface SetColorDialogState {
  dialogOpen: boolean;
  forCondition?: keyof ConditionColorListState;
}

export interface SetColorDialogProps extends SetColorDialogState {
  onDialogClose: (save: boolean) => (event: any) => void;
}

export interface ColorsPageState extends ConditionColorListState, SetColorDialogState {
}

export interface ColorsPageProps extends ConditionColorListProps, SetColorDialogProps {
}

export const ConditionColorList = (props: ConditionColorListProps) => ( 
  <List>
    <ListItem button={true} onClick={props.onColorClick('clear')}>
      <Avatar style={{'backgroundColor': props.clear}} />
      <ListItemText primary="Clear" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('windy')}>
      <Avatar style={{'backgroundColor': props.windy}} />
      <ListItemText primary="Windy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('partlyCloudy')}>
      <Avatar style={{'backgroundColor': props.partlyCloudy}} />
      <ListItemText primary="Partly Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('cloudy')}>
      <Avatar style={{'backgroundColor': props.cloudy}} />
      <ListItemText primary="Cloudy" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('rain')}>
      <Avatar style={{'backgroundColor': props.rain}} />
      <ListItemText primary="Rain" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('snow')}>
      <Avatar style={{'backgroundColor': props.snow}} />
      <ListItemText primary="Snow" />
    </ListItem>

    <ListItem button={true} onClick={props.onColorClick('fog')}>
      <Avatar style={{'backgroundColor': props.fog}} />
      <ListItemText primary="Fog" />
    </ListItem>
  </List>
);

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

export const ColorsPage = (props: ColorsPageProps) => (
  <div>
    <h1>Colors</h1>
    <ConditionColorList
      clear={props.clear}
      windy={props.windy}
      partlyCloudy={props.partlyCloudy}
      cloudy={props.cloudy}
      rain={props.rain}
      snow={props.snow}
      fog={props.fog}
      onColorClick={props.onColorClick}
    />
    <SetColorDialog
      dialogOpen={props.dialogOpen}
      forCondition={props.forCondition}
      onDialogClose={props.onDialogClose}
    />
  </div>
);
