import * as React from 'react';
import { Navbar } from './Navbar';
import WeatherPage from './WeatherPage';
import SettingsPage from './SettingsPage';
import ColorsPage  from './colors-page/ColorsPage';
import { DashboardState } from './store/store';
import { connect } from 'react-redux';

interface AppProps {
  page: number;
}

const App = (props: AppProps) => {
  return (
    <div className="App">
      {props.page === 0 && <WeatherPage />}
      {props.page === 1 && <ColorsPage />}
      {props.page === 2 && <SettingsPage />}

      <Navbar />
    </div>
  );
}

const mapStateToProps = (state: DashboardState) => {
  return {
    page: state.app.page,
  };
};

export default connect(mapStateToProps)(App);
