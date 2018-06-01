import { SetColorDialogState } from '../ColorDialog';
import { AnyAction } from 'redux';

const initialState: SetColorDialogState = {
  dialogOpen: false,
  red: 7,
  green: 7,
  blue: 7,
};

export const COLOR_DIALOG_ACTIONS = {
  TOGGLE_DIALOG: 'TOGGLE_DIALOG',
  SET_COLOR: 'SET_COLOR',
  SET_ALL_COLORS: 'SET_ALL_COLOR',
  SET_COLOR_FOR: 'SET_COLOR_FOR',
};

export function colorDialogReducer(state: SetColorDialogState = initialState, action: AnyAction): SetColorDialogState {
  switch (action.type) {
    case COLOR_DIALOG_ACTIONS.TOGGLE_DIALOG:
      const toggledDialog = {
        ...state,
        dialogOpen: !state.dialogOpen,
      };
      return toggledDialog;

    case COLOR_DIALOG_ACTIONS.SET_COLOR:
      const setColor = { ...state };
      setColor[action.color] = action.value;
      return setColor;

    case COLOR_DIALOG_ACTIONS.SET_ALL_COLORS:
      const newColor = {
        ...state,
        red: action.red,
        blue: action.blue,
        green: action.green,
      };
      return newColor;

    case COLOR_DIALOG_ACTIONS.SET_COLOR_FOR:
      const colorFor = {
        ...state,
        colorFor: action.value,
      };
      return colorFor;

    default:
      return state;
  }
}
