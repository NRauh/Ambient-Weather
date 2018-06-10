import { ConditionList } from '@light/types';
import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { AnyAction } from 'redux';
import { UnitOptions, WeatherStatus, Location } from '@light/types';
import { ACTIONS } from './actions';
import createSagaMiddleware from 'redux-saga';
import { lightSaga } from './actions';

export interface AppState {
  page: number;
}

export interface SettingsState extends Location {
  unit: UnitOptions;
  hostname: string;
}

export interface WeatherState {
  current: WeatherStatus;
  forecast: WeatherStatus[];
}

export interface DashboardState {
  app: AppState;
  weather: WeatherState;
  settings: SettingsState;
  conditionColors: ConditionList,
}

const defaultState: DashboardState = {
  app: {
    page: 0,
  },
  conditionColors: {
    clear: { red: 220, green: 220, blue: 220 },
    windy: { red: 210, green: 210, blue: 210 },
    partlyCloudy: { red: 200, green: 200, blue: 200 },
    cloudy: { red: 190, green: 190, blue: 190 },
    rain: { red: 180, green: 180, blue: 180 },
    snow: { red: 170, green: 170, blue: 170 },
    fog: { red: 160, green: 160, blue: 160 },
  },
  settings: {
    lat: '0.0',
    long: '0.0',
    unit: UnitOptions.SI,
    hostname: 'hello-led',
  },
  weather: {
    current: {
      temperature: 0,
      condition: '',
      time: 0,
    },
    forecast: [],
  }
}

export function rootReducer(initialState: DashboardState = defaultState, action: AnyAction): DashboardState {
  switch (action.type) {
    case ACTIONS.SET_ALL_SETTINGS:
      return {
        ...initialState,
        settings: { ...action.value },
      };

    case ACTIONS.SET_ALL_CONDITIONS:
      return {
        ...initialState,
        conditionColors: { ...action.value },
      };

    case ACTIONS.SET_CONDITION:
      const newColor = { ...initialState };
      newColor.conditionColors[action.color] = action.value;
      return newColor;

    case ACTIONS.SET_WEATHER:
      return {
        ...initialState,
        weather: { ...action.value },
      };

    case ACTIONS.SET_PAGE:
      const newPage = { ...initialState };
      newPage.app.page = action.value;
      return newPage;

    default:
      return initialState;
  }
}

const sagaMiddlware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  // applyMiddleware(composeWithDevTools(), sagaMiddlware)
  applyMiddleware(sagaMiddlware)
);

sagaMiddlware.run(lightSaga);
