import { State, Colors } from './types';
import { AnyAction } from 'redux';
import { dashboardReducer } from './store';
import { ActionTypes } from '.';

describe('dashboardReducer', () => {
  it('should default to the given state', () => {
    const givenState: State = {
      weather: {},
      settings: {},
      colors: { clear: '#767676' },
    };
    const givenAction: AnyAction = { type: 'FAKE' };

    expect(dashboardReducer(givenState, givenAction)).toEqual(givenState);
  });

  it('should be able to update all colors', () => {
    const testColors: Colors = {
      clear: '#123456',
      cloudy: '#654321',
    };
    const givenState: State = {
      weather: {},
      settings: {},
      colors: {},
    };
    const givenAction: AnyAction = {
      type: ActionTypes.UPDATE_COLORS,
      value: testColors,
    };
    const expectedState: State = {
      weather: {},
      settings: {},
      colors: testColors,
    };

    expect(dashboardReducer(givenState, givenAction)).toEqual(expectedState);
  });

  it('should be able to update a single color', () => {
    const givenState: State = {
      weather: {},
      settings: {},
      colors: { clear: '#7cab92' },
    };
    const givenAction: AnyAction = {
      type: ActionTypes.UPDATE_SINGLE_COLOR,
      color: 'clear',
      value: '#829304',
    };
    const expectedState: State = {
      weather: {},
      settings: {},
      colors: { clear: '#829304' },
    };

    expect(dashboardReducer(givenState, givenAction)).toEqual(expectedState);
  });
});
