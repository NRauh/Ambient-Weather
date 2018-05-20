import { AnyAction } from 'redux';
import { Colors } from './types';
import axios, { AxiosResponse } from 'axios';
import { store } from './store';

export enum ActionTypes {
  UPDATE_COLORS,
  UPDATE_SINGLE_COLOR,
}

export function updateColors(newColors: Colors) {
  const action: AnyAction = {
    type: ActionTypes.UPDATE_COLORS,
    value: newColors,
  };
  store.dispatch(action);
}

export async function getColors() {
  try {
    const value: AxiosResponse<Colors> = await axios.get('http://localhost:3000/colors');
    this.updateColors(value.data);
  } catch (err) {
    console.error('error getting colors:', err);
  }
};

export function updateSingleColor(color: keyof Colors, value: string): void {
  const action: AnyAction = {
    color,
    value,
    type: ActionTypes.UPDATE_SINGLE_COLOR,
  };
  store.dispatch(action);
}