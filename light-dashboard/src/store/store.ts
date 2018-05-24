import { createStore, AnyAction } from 'redux';
import { State } from './types';
import { ActionTypes } from './actions';

const defaultState: State = {
  weather: {},
  colors: {},
  settings: {},
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

    default:
      return initialState;
  }
}

export const store = createStore(dashboardReducer);
