import * as React from 'react';
import { Navbar } from './Navbar';
import WeatherPage from './WeatherPage';
import SettingsPage from './SettingsPage';
import ColorsPage  from './ColorsPage';
import { DashboardState } from './store/store';
import { connect } from 'react-redux';

interface AppProps {
  page: number;
}

class App extends React.Component<any, any> {
  constructor(props: AppProps) {
    super(props);
  }

  currentPage = () => {
    if (this.props.page === 0) {
      return (
        <WeatherPage />
      );
    } else if (this.props.page === 1) {
      return (
        <ColorsPage />
      );
    } else if (this.props.page === 2) {
      return (
        <SettingsPage />
      );
    } else {
      return;
    }
  }

  public render() {
    return (
      <div className="App">
        {this.currentPage()}

        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = (state: DashboardState) => {
  return {
    page: state.app.page,
  };
};

export default connect(mapStateToProps)(App);
