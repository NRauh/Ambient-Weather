import React, { Component } from 'react';

export default class Weather extends Component {
  render() {
    return (
      <div>
        <div className="left">
          <img src="https://placekitten.com/400/400" alt="Weather Icon" />
        </div>
        <div className="right">
          <h1>Location</h1>
          <h2>68 - Sunny</h2>
        </div>

        <div className="full">
          <hr className="currentColor" />

          <ul>
            <li>00:00 - Color</li>
            <li>04:00 - Color</li>
            <li>08:00 - Color</li>
            <li>12:00 - Color</li>
            <li>16:00 - Color</li>
            <li>20:00 - Color</li>
            <li>00:00 - Color</li>
          </ul>
        </div>
      </div>
    );
  }
}
