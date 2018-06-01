import { ConditionColorListState } from '../ColorsPage';
import { AnyAction } from 'redux';

const initialColorList: ConditionColorListState = {
  clear: '#ddd',
  windy: '#ccc',
  partlyCloudy: '#bbb',
  cloudy: '#aaa',
  rain: '#999',
  snow: '#888',
  fog: '#777',
};

export const CONDITION_COLOR_ACTIONS = {
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
};

export function colorsReducer(state = initialColorList, action: AnyAction): ConditionColorListState {
  switch (action.type) {
    case CONDITION_COLOR_ACTIONS.SET_ALL_CONDITIONS:
      return { ...state, ...action.value };

    case CONDITION_COLOR_ACTIONS.SET_CONDITION:
      const newColor = { ...state };
      newColor[action.color] = action.value;
      return newColor;

    default:
      return state;
  }
}
