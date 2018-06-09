import { ConditionList } from '@light/types';
import { AnyAction } from 'redux';

const initialColorList: ConditionList = {
  clear: { red: 220, green: 220, blue: 220 },
  windy: { red: 210, green: 210, blue: 210 },
  partlyCloudy: { red: 200, green: 200, blue: 200 },
  cloudy: { red: 190, green: 190, blue: 190 },
  rain: { red: 180, green: 180, blue: 180 },
  snow: { red: 170, green: 170, blue: 170 },
  fog: { red: 160, green: 160, blue: 160 },
};

export const CONDITION_COLOR_ACTIONS = {
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
};

export function colorsReducer(state = initialColorList, action: AnyAction): ConditionList {
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
