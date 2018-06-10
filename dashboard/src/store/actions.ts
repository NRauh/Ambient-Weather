import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { WeatherState, SettingsState } from './store';
import { ConditionList } from '@light/types';
import * as api from '../api';
import { AnyAction } from 'redux';

export const ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  SET_ALL_SETTINGS_ASYNC: 'SET_ALL_SETTINGS_ASYNC',
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
  SET_CONDITION_ASYNC: 'SET_CONDITION_ASYNC',
  SET_WEATHER: 'SET_WEATHER',
  SET_PAGE: 'SET_PAGE',

  GET_WEATHER: 'GET_WEATHER',
  GET_ALL_CONDITIONS: 'GET_ALL_CONDITIONS',
  GET_ALL_SETTINGS: 'GET_ALL_SETTINGS',
};

function* fetchWeather() {
  try {
    const weather: WeatherState = yield call(api.getWeather);
    yield put({ type: ACTIONS.SET_WEATHER, value: weather });
  } catch (e) {
    console.error(e);
  }
}

function* fetchConditions() {
  try {
    const conditions: ConditionList = yield call(api.getConditions);
    yield put({ type: ACTIONS.SET_ALL_CONDITIONS, value: conditions });
  } catch (e) {
    console.error(e);
  }
}

function* fetchSettings() {
  try {
    const settings: SettingsState = yield call(api.getSettings);
    yield put({ type: ACTIONS.SET_ALL_SETTINGS, value: settings });
  } catch (e) {
    console.error(e);
  }
}

function* saveConditions(action: AnyAction) {
  try {
    const syncAction: AnyAction = {
      type: ACTIONS.SET_CONDITION,
      color: action.color,
      value: action.value,
    };
    yield put(syncAction);
    yield call(api.updateCondition, action.color, action.value);
  } catch (e) {
    console.error(e);
  }
}

function* saveSettings(action: AnyAction) {
  try {
    const syncAction: AnyAction = {
      type: ACTIONS.SET_ALL_SETTINGS,
      value: action.value,
    };
    yield put(syncAction);
    yield call(api.updateSettings, action.value);
  } catch (e) {
    console.error(e);
  }
}

export function* lightSaga() {
  yield takeLatest(ACTIONS.GET_WEATHER, fetchWeather);
  yield takeLatest(ACTIONS.GET_ALL_CONDITIONS, fetchConditions);
  yield takeLatest(ACTIONS.GET_ALL_SETTINGS, fetchSettings);
  yield takeEvery(ACTIONS.SET_CONDITION_ASYNC, saveConditions);
  yield takeEvery(ACTIONS.SET_ALL_SETTINGS_ASYNC, saveSettings);
}
