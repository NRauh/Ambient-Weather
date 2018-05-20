import { Colors } from './colors';

export interface WeatherStatus {
  color?: [keyof Colors];
  temperature?: number;
  time?: number;
}

export interface WeatherReport extends WeatherStatus {
  hourly?: WeatherStatus[];
}
