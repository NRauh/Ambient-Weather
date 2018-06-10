import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { WeatherState } from './store';

export const ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
  SET_WEATHER: 'SET_WEATHER',
  SET_PAGE: 'SET_PAGE',
  GET_WEATHER: 'GET_WEATHER',
};

async function getWeather(): Promise<WeatherState> {
  const res: AxiosResponse<WeatherState> = await axios.get('http://localhost:3001/api/weather');
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

export function* lightSaga() {
  yield takeLatest(ACTIONS.GET_WEATHER, fetchWeather);
}
