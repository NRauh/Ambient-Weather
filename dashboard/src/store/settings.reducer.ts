import { SettingsPageState } from '../SettingsPage';
import { AnyAction } from 'redux';

const initialSettingsState: SettingsPageState = {
  lat: '0.0',
  long: '0.0',
  unit: 'SI',
  hostname: 'hello-led',
};

const blankSettings: SettingsPageState = {
  lat: '',
  long: '',
  unit: 'SI',
  hostname: '',
};

export const SETTINGS_ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  UPDATE_SETTING: 'UPDATE_SETTING',
  SAVE_PREVIOUS: 'SAVE_PREVIOUS',
};

export function settingsReducer(state = initialSettingsState, action: AnyAction): SettingsPageState {
  switch (action.type) {
    case SETTINGS_ACTIONS.SET_ALL_SETTINGS:
      return { ...state, ...action.value };

    case SETTINGS_ACTIONS.UPDATE_SETTING:
      const updatedSettings = { ...state };
      updatedSettings[action.setting] = action.value;
      return updatedSettings;

    default:
      return state;
  }
}

export function previousSettingsReducer(state = blankSettings, action: AnyAction): SettingsPageState {
  if (action.type === SETTINGS_ACTIONS.SAVE_PREVIOUS) {
    return action.value;
  } else {
    return state;
  }
}
