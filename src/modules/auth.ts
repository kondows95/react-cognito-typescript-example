//import { Dispatch, Reducer } from 'redux';
import { Auth } from 'aws-amplify';
import { AppState, AuthState } from './index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import { CognitoUser } from '@aws-amplify/auth';

const initialState: AuthState = {
  authState: 'signIn',
  user: null,
  email: "",
  error: "",
  loading: false,
};

//=============================================================================
//Reducers
//=============================================================================
export default (state: AuthState = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case 'AUTH_SYSTEM_ERROR':
      return {
        ..._getCommonState(state),
        error: action.payload,
        loading: false
      };
    case 'AUTH_BEGIN_LOADING':
      return {
        ..._getCommonState(state),
        loading: true
      };
    case 'AUTH_INIT':
      return {
        ...initialState
      };
    case 'AUTH_CHANGE_AUTH_STATE':
      return {
        ..._getCommonState(state),
        authState: action.payload
      };
    case 'AUTH_FETCH_AUTHED_USER':
      return {
        ..._getCommonState(state),
        user: action.payload
      };
    case 'AUTH_SIGN_IN_SUCCESS':
      return {
        ..._getCommonState(state),
        user: action.payload,
        authState: "",
      };
    case 'AUTH_FORGOT_PASSWORD_SUCCESS':
      return {
        ..._getCommonState(state),
        authState: 'forgotPasswordReset',
        email: action.payload,
      };
    default:
      return state;
  }
};

const _getCommonState = (state: AuthState) => ({
  ...state, 
  error: "",
  loading: false,
});

//=============================================================================
//Actions
//=============================================================================
export type Actions = ReturnType<
  typeof fetchAuthedUserSuccess 
  | typeof authInit 
  | typeof authBeginLoading
  | typeof authError
  | typeof changeAuthState
  | typeof authSignInSuccess
  | typeof authForgotPasswordSuccess
>

export const fetchAuthedUserSuccess = (user: CognitoUser) => ({
  type: 'AUTH_FETCH_AUTHED_USER',
  payload: user
});

export const authInit = () => ({
  type: 'AUTH_INIT',
});

export const authBeginLoading = () => ({
  type: 'AUTH_BEGIN_LOADING',
});

export const authError = (err: any) => ({
  type: 'AUTH_SYSTEM_ERROR',
  payload: err.message || err
});

export const changeAuthState = (value: string) =>  ({
  type: 'AUTH_CHANGE_AUTH_STATE',
  payload: value
});

export const authSignInSuccess = (user: CognitoUser) =>  ({
  type: 'AUTH_SIGN_IN_SUCCESS',
  payload: user
});

export const authForgotPasswordSuccess = (email: string) =>  ({
  type: 'AUTH_FORGOT_PASSWORD_SUCCESS',
  payload: email
});

//=============================================================================
//Async Operations
//=============================================================================
type Dispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export const refreshToken = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(currentSession.getRefreshToken(), (err: any, session: any) => {
        //const { idToken, refreshToken, accessToken } = session;
        // do whatever you want to do now :)
      });
    }
    catch(err) {
      dispatch(authError(err));
    }
  };
};

export const fetchAuthedUser = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(authBeginLoading());
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch(fetchAuthedUserSuccess(user));
    }
    catch {
      dispatch(authInit());
    }
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(authInit());
    try {
      await Auth.signOut();
    }
    catch(err) {
      //No error message is set here.
      //If you set error message here, the message is always displayed.
      dispatch(authError(err));
    }
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(authBeginLoading());
    try {
      const user = await Auth.signIn(email, password);
      dispatch(authSignInSuccess(user));
    }
    catch(err) {
      dispatch(authError(err));
    }
  };
};

export const forgotPassword = (email: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(authBeginLoading());
    try {
      await Auth.forgotPassword(email);
      dispatch(authForgotPasswordSuccess(email));
    }
    catch(err) {
      dispatch(authError(err));
    }
  };
};

export const forgotPasswordSubmit = (email: string, code: string, password: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    dispatch(authBeginLoading());
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      dispatch(authInit());
    }
    catch(err) {
      dispatch(authError(err));
    }
  };
};