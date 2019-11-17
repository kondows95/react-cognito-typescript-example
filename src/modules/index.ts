import { combineReducers, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import authReducer from './auth';
import Amplify from 'aws-amplify';
import cognito_exports from '../my-cognito-exports';
Amplify.configure(cognito_exports);

export default combineReducers({
  auth: authReducer,
});

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
