import { WeatherReport } from './weather'
import { Colors } from './colors';
import { Settings } from './settings';

export interface State {
  weather: WeatherReport;
  colors: Colors;
  settings: Settings;
}
