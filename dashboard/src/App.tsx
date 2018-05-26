import * as React from 'react';
import { Navbar } from './Navbar';
import { WeatherPage } from './WeatherPage';

class App extends React.Component {
  public state = {
    page: 0,
  };

  constructor(props: any) {
    super(props);
  }

  changePage = (event: any, value: number) => {
    this.setState({ page: value });
  }

  currentPage = () => {
    if (this.state.page === 0) {
      return <WeatherPage />;
    } else {
      return;
    }
  }

  public render() {
    return (
      <div className="App">
        {this.currentPage()}

        <Navbar
          page={this.state.page}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

export default App;
