import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppState = {
  auth: AuthState
};

export type AppDispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export type AuthState = {
  authState: string
  error: string
  loading: boolean
  user: any
  email: string
};
