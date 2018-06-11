import { ConditionList } from './condition-list';

export interface WeatherStatus {
  condition: keyof ConditionList;
  human: string;
  temperature: number;
  time: number
}
