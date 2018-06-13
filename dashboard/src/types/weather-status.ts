import { ConditionList } from './condition-list';

export interface WeatherStatus {
  condition: keyof ConditionList;
  temperature: number;
  time: number
}
