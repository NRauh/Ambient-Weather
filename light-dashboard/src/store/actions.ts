import { AnyAction } from 'redux';
import { Colors, WeatherReport, Settings } from './types';
import axios, { AxiosResponse } from 'axios';
import { store } from './store';

export const ActionTypes = {
  UPDATE_COLORS: 'UPDATE_COLORS', 
  UPDATE_SINGLE_COLOR: 'UPDATE_SINGLE_COLOR',
  UPDATE_WEATHER: 'UPDATE_WEATHER',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

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
}

export async function updateSingleColor(color: keyof Colors, value: string): Promise<void> {
  const action: AnyAction = {
    color,
    value,
    type: ActionTypes.UPDATE_SINGLE_COLOR,
  };
  store.dispatch(action);

  try {
    const update: Colors = { [color]: value };
    const request: AxiosResponse<Colors> = await axios.patch('http://localhost:3000/colors',
                                                             update);
  } catch (err) {
    // todo: reset previously added color
    throw 'Unable to save colors';
  }
}

export async function getWeather() {
  try {
    const request: AxiosResponse<WeatherReport> = await axios.get('http://localhost:3000/weather');
    this.updateWeather(request.data);
  } catch (err) {
    console.log('error getting weather:', err);
  }
}

export function updateWeather(weather: WeatherReport) {
  const action: AnyAction = {
    weather,
    type: ActionTypes.UPDATE_WEATHER,
  };
  store.dispatch(action);
}

export async function getSettings() {
  try {
    const request: AxiosResponse<Settings> = await axios.get('http://localhost:3000/settings');
    this.updateSettings(request.data);
  } catch (err) {
    console.log('error getting settings', err);
  }
}

export function updateSettings(settings: Settings) {
  const action: AnyAction = {
    settings,
    type: ActionTypes.UPDATE_SETTINGS,
  };
  store.dispatch(action);
}

export async function saveSettings(newSettings: Settings) {
  try {
    const request: AxiosResponse<Settings> = await axios.patch('http://localhost:3000/settings',
                                                               newSettings);
    this.updateSettings(request.data);
  } catch (err) {
    console.log('error saving settings');
  }
}
