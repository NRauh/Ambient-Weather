import * as React from 'react';
import { WeatherInfo } from './WeatherInfo';
import { WeatherForecast } from './WeatherForecast';
import { DashboardState, WeatherState } from '../store';
import { connect } from 'react-redux';
import { ConditionList, Color } from '@light/types';
import { Divider } from '@material-ui/core';

interface WeatherPageProps extends WeatherState {
  colors: ConditionList,
}

const WeatherPage = (props: WeatherPageProps) => {
  const currentColor: Color = props.colors[props.current.condition] || {};
  const dividerStyles = {
    backgroundColor: `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`,
  };

  return (
    <div className="weather">
      <WeatherInfo
        temperature={props.current.temperature}
        condition={props.current.condition}
        time={props.current.time}
      />

      <Divider style={dividerStyles} />

      <WeatherForecast
        forecast={props.forecast}
        colors={props.colors}
      />
    </div>
  );
};

const mapStateToProps = (state: DashboardState) => {
  return {
    current: state.weather.current,
    forecast: state.weather.forecast,
    colors: state.conditionColors,
  };
};

export default connect(mapStateToProps)(WeatherPage);
