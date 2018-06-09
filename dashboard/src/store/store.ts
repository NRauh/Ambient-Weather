import { ConditionList } from '@light/types';
import { combineReducers, createStore } from 'redux';
import { colorsReducer } from './colors.reducer';
import { previousSettingsReducer, settingsReducer, SettingsState } from './settings.reducer';
import { weatherReducer, WeatherState } from './weather.reducer';
import { appReducer } from './app.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface AppState {
  page: number;
}

export interface DashboardState {
  app: AppState;
  weather: WeatherState;
  settings: SettingsState;
  previousSettings?: SettingsState;
  conditionColors: ConditionList,
}

const rootReducer = combineReducers<DashboardState>({
  conditionColors: colorsReducer,
  previousSettings: previousSettingsReducer,
  settings: settingsReducer,
  weather: weatherReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
