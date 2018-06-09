import { ConditionList } from '@light/types';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AnyAction } from 'redux';
import { UnitOptions, WeatherStatus, Location } from '@light/types';

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
      temperature: 68,
      condition: 'Clear',
      time: 1000000,
    },
    forecast: [
      {
        temperature: 58,
        condition: 'Rainy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Foggy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Snowy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Partly Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Cloudy',
        time: 1000000,
      },
    ],
  }
}

export const ACTIONS = {
  SET_ALL_SETTINGS: 'SET_ALL_SETTINGS',
  SET_ALL_CONDITIONS: 'SET_ALL_CONDITIONS',
  SET_CONDITION: 'SET_CONDITION',
  SET_WEATHER: 'SET_WEATHER',
  SET_PAGE: 'SET_PAGE',
};

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

export const store = createStore(rootReducer, composeWithDevTools());
