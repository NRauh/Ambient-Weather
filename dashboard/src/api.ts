import axios, { AxiosResponse } from 'axios';
import { ConditionList, Color } from '@light/types';
import { SettingsState, WeatherState } from './store';

export async function getWeather(): Promise<WeatherState> {
  const res: AxiosResponse<WeatherState> = await axios.get('http://localhost:3001/api/weather');
  return res.data;
}

export async function getConditions(): Promise<ConditionList> {
  const res: AxiosResponse<ConditionList> = await axios.get('http://localhost:3001/api/conditions');
  return res.data;
}

export async function getSettings(): Promise<SettingsState> {
  const res: AxiosResponse<SettingsState> = await axios.get('http://localhost:3001/api/settings');
  return res.data;
}

export async function updateCondition(condition: keyof ConditionList, value: Color): Promise<ConditionList> {
  const res: AxiosResponse<ConditionList> = await axios.patch('http://localhost:3001/api/conditions', {
    [condition]: value,
  });
  return res.data;
}

export async function updateSettings(settings: SettingsState): Promise<SettingsState> {
  const res: AxiosResponse<SettingsState> = await axios.patch('http://localhost:3001/api/settings', settings);
  return res.data;
}
