import { AppState } from './store';
import { AnyAction } from 'redux';

const initialAppState: AppState = {
  page: 0,
};

export const APP_ACTIONS = {
  SET_PAGE: 'SET_PAGE'
};

export function appReducer(state = initialAppState, action: AnyAction): AppState {
  if (action.type === APP_ACTIONS.SET_PAGE) {
    return { ...state, page: action.value };
  } else {
    return state;
  }
}
