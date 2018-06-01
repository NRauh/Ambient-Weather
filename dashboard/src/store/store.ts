import { WeatherProps } from '../WeatherPage';
import { SettingsPageState } from '../SettingsPage';
import { ConditionColorListState } from '../ColorsPage';
import { SetColorDialogState } from '../ColorDialog';
import { combineReducers, createStore } from 'redux';
import { colorDialogReducer } from './color-dialog.reducer';
import { colorsReducer } from './colors.reducer';
import { previousSettingsReducer, settingsReducer } from './settings.reducer';
import { weatherReducer } from './weather.reducer';
import { appReducer } from './app.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface AppState {
  page: number;
}

export interface DashboardState {
  app: AppState;
  weather: WeatherProps;
  settings: SettingsPageState;
  previousSettings?: SettingsPageState;
  conditionColors: ConditionColorListState,
  colorDialog: SetColorDialogState,
}

const rootReducer = combineReducers<DashboardState>({
  colorDialog: colorDialogReducer,
  conditionColors: colorsReducer,
  previousSettings: previousSettingsReducer,
  settings: settingsReducer,
  weather: weatherReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
