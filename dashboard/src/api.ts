import axios, { AxiosResponse } from 'axios';
import { ConditionList, Color } from '@light/types';
import { SettingsState, WeatherState } from './store';

const weatherUrl = `${process.env.REACT_APP_ESP_URL}/api/weather`;
const conditionsUrl = `${process.env.REACT_APP_ESP_URL}/api/conditions`;
const settingsUrl = `${process.env.REACT_APP_ESP_URL}/api/settings`;

export async function getWeather(): Promise<WeatherState> {
  const res: AxiosResponse<WeatherState> = await axios.get(weatherUrl);
  return res.data;
}

export async function getConditions(): Promise<ConditionList> {
  const res: AxiosResponse<ConditionList> = await axios.get(conditionsUrl);
  return res.data;
}

export async function getSettings(): Promise<SettingsState> {
  const res: AxiosResponse<SettingsState> = await axios.get(settingsUrl);
  return res.data;
}

export async function updateCondition(condition: keyof ConditionList, value: Color): Promise<ConditionList> {
  const res: AxiosResponse<ConditionList> = await axios.patch(conditionsUrl, {
    [condition]: value,
  });
  return res.data;
}

export async function updateSettings(settings: SettingsState): Promise<SettingsState> {
  const res: AxiosResponse<SettingsState> = await axios.patch(settingsUrl, settings);
  return res.data;
}
