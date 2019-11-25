import { combineReducers } from 'redux';
import authReducer from './auth';
import Amplify from 'aws-amplify';
import cognito_exports from '../my-cognito-exports';

Amplify.configure(cognito_exports);

export default combineReducers({
  auth: authReducer,
});