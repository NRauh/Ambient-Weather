import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { WeatherState, SettingsState } from './store';
import { ConditionList } from '@light/types';

export const ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
  SET_WEATHER: 'SET_WEATHER',
  SET_PAGE: 'SET_PAGE',
  GET_WEATHER: 'GET_WEATHER',
  GET_ALL_CONDITIONS: 'GET_ALL_CONDITIONS',
  GET_ALL_SETTINGS: 'GET_ALL_SETTINGS',
};

async function getWeather(): Promise<WeatherState> {
  const res: AxiosResponse<WeatherState> = await axios.get('http://localhost:3001/api/weather');
  return res.data;
}

async function getConditions(): Promise<ConditionList> {
  const res: AxiosResponse<ConditionList> = await axios.get('http://localhost:3001/api/conditions');
  return res.data;
}

async function getSettings(): Promise<SettingsState> {
  const res: AxiosResponse<SettingsState> = await axios.get('http://localhost:3001/api/settings');
  return res.data;
}

function* fetchWeather() {
  try {
    const weather: WeatherState = yield call(getWeather);
    yield put({ type: ACTIONS.SET_WEATHER, value: weather });
  } catch (e) {
    console.error(e);
  }
}

function* fetchConditions() {
  try {
    const conditions: ConditionList = yield call(getConditions);
    yield put({ type: ACTIONS.SET_ALL_CONDITIONS, value: conditions });
  } catch (e) {
    console.error(e);
  }
}

function* fetchSettings() {
  try {
    const settings: SettingsState = yield call(getSettings);
    yield put({ type: ACTIONS.SET_ALL_SETTINGS, value: settings });
  } catch (e) {
    console.error(e);
  }
}

export function* lightSaga() {
  yield takeLatest(ACTIONS.GET_WEATHER, fetchWeather);
  yield takeLatest(ACTIONS.GET_ALL_CONDITIONS, fetchConditions);
  yield takeLatest(ACTIONS.GET_ALL_SETTINGS, fetchSettings);
}
