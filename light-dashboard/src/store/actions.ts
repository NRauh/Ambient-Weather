import { AnyAction } from 'redux';
import { Colors } from './types';
import axios, { AxiosResponse } from 'axios';
import { store } from './store';

export const ActionTypes = {
  UPDATE_COLORS: 'UPDATE_COLORS', 
  UPDATE_SINGLE_COLOR: 'UPDATE_SINGLE_COLOR',
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

export async function updateSingleColor(color: keyof Colors, value: string): Promise<void> {
  const action: AnyAction = {
    color,
    value,
    type: ActionTypes.UPDATE_SINGLE_COLOR,
  };
  store.dispatch(action);

  try {
    const update: Colors = { [color]: value };
    const request: AxiosResponse<Colors> = await axios.patch('http://localhost:3000/colors', update);
  } catch (err) {
    // todo: reset previously added color
    throw 'Unable to save colors';
  }
}
