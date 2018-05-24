import { createStore, AnyAction } from 'redux';
import { State } from './types';
import { ActionTypes, updateWeather, updateSettings } from './actions';

const defaultState: State = {
  weather: {
    hourly: [],
  },
  colors: {},
  settings: {
    hostname: '',
    location: '',
    unit: null,
  },
};

export function dashboardReducer(initialState: State = defaultState, action: AnyAction): State {
  switch (action.type) {
    case 'UPDATE_COLORS':
      const newState: State = { ...initialState };
      newState.colors = { ...newState.colors, ...action.value };
      return newState;

    case 'UPDATE_SINGLE_COLOR':
      const updatedColor: State = { ...initialState };
      updatedColor.colors[action.color] = action.value;
      return updatedColor;

    case 'UPDATE_WEATHER':
      const updatedWeather: State = { ...initialState };
      updatedWeather.weather = { ...updatedWeather.weather, ...action.weather };
      return updatedWeather;

    case 'UPDATE_SETTINGS':
      const updatedSettings: State = { ...initialState };
      updatedSettings.settings = { ...updatedSettings.settings, ...action.settings };
      return updatedSettings;

    default:
      return initialState;
  }
}

export const store = createStore(dashboardReducer);
