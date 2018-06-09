import { WeatherStatus } from '@light/types';
import { AnyAction } from 'redux';

export interface WeatherState {
  current: WeatherStatus;
  forecast: WeatherStatus[];
}

const initialWeatherState: WeatherState = {
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
};

export const WEATHER_ACTIONS = {
  SET_WEATHER: 'SET_WEATHER',
};

export function weatherReducer(state = initialWeatherState, action: AnyAction): WeatherState {
  if (action.type === WEATHER_ACTIONS.SET_WEATHER) {
    return { ...state, ...action.value };
  } else {
    return state;
  }
}
