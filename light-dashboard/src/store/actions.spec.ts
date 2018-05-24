jest.mock('axios');
jest.mock('./store');
import * as actions from './actions';
import axios from 'axios';
import { Colors } from './types';
import { store } from './index';
import { AnyAction } from 'redux';

describe('updateColors', () => {
  it('should dispatch an update color action', () => {
    const newColors: Colors = { clear: '#ababab' };
    const expectedAction: AnyAction = {
      type: actions.ActionTypes.UPDATE_COLORS,
      value: newColors,
    };

    actions.updateColors(newColors);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('getColors', () => {
  let fakeResponse: Colors;

  beforeEach(() => {
    fakeResponse = { cloudy: '#dcdcdc' };
    (axios.get as jest.Mock).mockReturnValue(new Promise((resolve) => {
      resolve({ data: fakeResponse });
    }));
    actions.updateColors = jest.fn();
  });

  it('should request to get the colors', async () => {
    await actions.getColors();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/colors');
  });

  it('should run updateColors', async () => {
    await actions.getColors();
    expect(actions.updateColors).toHaveBeenCalledWith(fakeResponse);
  });
});

describe('updateSingleColor', () => {
  it('should dispatch an action to update a single color', () => {
    const expectedAction: AnyAction = {
      color: 'clear',
      value: '#424242',
      type: actions.ActionTypes.UPDATE_SINGLE_COLOR,
    };
    actions.updateSingleColor('clear', '#424242');
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should send a request to save the color', async () => {
    const expectedColor: Colors = { clear: '#424242' };
    await actions.updateSingleColor('clear', '#424242');
    expect(axios.patch).toHaveBeenCalledWith('http://localhost:3000/colors', expectedColor);
  });
});
