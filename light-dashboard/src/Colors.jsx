import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class Colors extends Component {
  render() {
    return (
      <div>
        <h1>Color Selection</h1>

        <ul>
          <li>Clear</li>
          <li>Few Clouds</li>
          <li>Scattered Clouds</li>
          <li>Broken CLouds</li>
          <li>Shower Rain</li>
          <li>Rain</li>
          <li>Thunderstore</li>
          <li>Snow</li>
          <li>Mist</li>
          <li>Sever Weather</li>
        </ul>

        <RaisedButton label="Apply" primary />
        <RaisedButton label="Cycle" secondary />
        <RaisedButton label="Manual" secondary />
      </div>
    );
  }
}
