import { AnyAction } from 'redux';
import { Location, UnitOptions } from '@light/types';

export interface SettingsState extends Location {
  unit: UnitOptions;
  hostname: string;
}

const initialSettingsState: SettingsState = {
  lat: '0.0',
  long: '0.0',
  unit: UnitOptions.SI,
  hostname: 'hello-led',
};

const blankSettings: SettingsState = {
  lat: '',
  long: '',
  unit: UnitOptions.SI,
  hostname: '',
};

export const SETTINGS_ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  UPDATE_SETTING: 'UPDATE_SETTING',
  SAVE_PREVIOUS: 'SAVE_PREVIOUS',
};

export function settingsReducer(state = initialSettingsState, action: AnyAction): SettingsState {
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

export function previousSettingsReducer(state = blankSettings, action: AnyAction): SettingsState {
  if (action.type === SETTINGS_ACTIONS.SAVE_PREVIOUS) {
    return action.value;
  } else {
    return state;
  }
}
