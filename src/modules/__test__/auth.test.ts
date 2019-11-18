/*global expect,jest*/
import authReducer, { 
  changeAuthState, fetchAuthedUser,
  signOut, signIn,
  forgotPassword,forgotPasswordSubmit ,
  refreshToken
} from '../auth';
import { Auth } from 'aws-amplify';
import { AuthState } from '../index';
import { getDummyAppState, getInitialAuthState } from '../../testData';

let initialState: AuthState;
let dispatch:jest.Mock;
let getState: () => {auth: AuthState};
beforeEach(() => {
  dispatch = jest.fn();
  getState = () => getDummyAppState();
  initialState = getInitialAuthState();
});

//=============================================================================
//Reducers testing
//=============================================================================
it("AUTH_SYSTEM_ERROR", () => {
  const action = {
    type: 'AUTH_SYSTEM_ERROR',
    payload: "system error"
  };
  const expectedState = {
    ...initialState,
    error: "system error"
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_BEGIN_LOADING", () => {
  const action = {
    type: 'AUTH_BEGIN_LOADING'
  };
  const expectedState = {
    ...initialState,
    loading : true
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_INIT", () => {
  const action = {
    type: 'AUTH_INIT'
  };
  const expectedState = {
    ...initialState
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_CHANGE_AUTH_STATE", () => {
  const action = {
    type: 'AUTH_CHANGE_AUTH_STATE',
    payload: "signIn"
  };
  const expectedState = {
    ...initialState,
    authState: "signIn"
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_FETCH_AUTHED_USER", () => {
  const action = {
    type: 'AUTH_FETCH_AUTHED_USER',
    payload: [{email: 'example@gmail.com', password: '12345678'}]
  };
  const expectedState = {
    ...initialState,
    user: [{email: 'example@gmail.com', password: '12345678'}]
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_SIGN_IN_SUCCESS", () => {
  const action = {
    type: 'AUTH_SIGN_IN_SUCCESS',
    payload: [{email: 'example@gmail.com', password: '12345678'}]
  };
  const expectedState = {
    ...initialState,
    user: [{email: 'example@gmail.com', password: '12345678'}],
    authState: ""
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("AUTH_FORGOT_PASSWORD_SUCCESS", () => {
  const action = {
    type: 'AUTH_FORGOT_PASSWORD_SUCCESS',
    payload: 'example@gmail.com'
  };
  const expectedState = {
    ...initialState,
    authState: 'forgotPasswordReset',
    email: 'example@gmail.com'
  };
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

it("Default reducer", () => {
  const action = {
    type: "Default"
  };
  
  const expectedState = {
    ...initialState
  };
  
  const inputState = authReducer(initialState, action);
  expect(inputState).toEqual(expectedState);
});

//=============================================================================
//Operations testing
//=============================================================================
const expectedAction_beginLoading=[{
  type :'AUTH_BEGIN_LOADING'
}];

const expectedAction_init=[{
  type :'AUTH_INIT'
}];

it("changeAuthState", async () => {
  const expectedAction = {
    type: 'AUTH_CHANGE_AUTH_STATE',
    payload: 'signIn'
  };
  const value = "signIn";
  const action = changeAuthState(value);
  expect(action).toEqual(expectedAction);
});

it("fetchAuthedUser success", async () => {
  let user = {data: { email:'test@example.com'}};
   Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
       return  user;
   });
   
   const expectedAction = [{
     type :'AUTH_FETCH_AUTHED_USER',
     payload : { data: { email:'test@example.com'}}
   }];

   await fetchAuthedUser()(dispatch, getState);
   expect(Auth.currentAuthenticatedUser).toHaveBeenCalled();
   expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
   expect(dispatch.mock.calls[1]).toEqual(expectedAction);
 });

it("fetchAuthedUser error", async () => {
  Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
    throw "system error";
  });

  await fetchAuthedUser()(dispatch, getState);
  expect(Auth.currentAuthenticatedUser).toHaveBeenCalledWith();
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction_init);
});

it("signOut success", async () => {
  Auth.signOut = jest.fn();
  await signOut()(dispatch, getState);
  expect(Auth.signOut).toHaveBeenCalled();
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_init);
});

it("signOut error", async () => {
  Auth.signOut = jest.fn().mockImplementation(
  () => {
      throw "system error";
  });
  
  const expectedAction = [{
    type :'AUTH_SYSTEM_ERROR',
    payload : "system error"
  }];

  await signOut()(dispatch, getState);
  expect(Auth.signOut).toHaveBeenCalledWith();
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_init);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("signIn success", async () => {
  Auth.signIn = jest.fn().mockImplementation(() => {
    return  {data: { email:'test@example.com', password: '12345678' }};
  });

  const expectedAction = [{
    type :'AUTH_SIGN_IN_SUCCESS',
    payload : { data: { email:'test@example.com', password: '12345678' }}
  }];

  await signIn('test@example.com','12345678')(dispatch, getState);
  expect(Auth.signIn).toHaveBeenCalledWith('test@example.com','12345678');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("signIn error", async () => {
  Auth.signIn = jest.fn().mockImplementation(() => {
    throw "system error";
  });
  
  const expectedAction = [{
    type :'AUTH_SYSTEM_ERROR',
    payload : "system error"
  }];

  await signIn('test@example.com','12345678')(dispatch, getState);
  expect(Auth.signIn).toHaveBeenCalledWith('test@example.com','12345678');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("forgotPasswordSubmit success", async () => {
  Auth.forgotPasswordSubmit = jest.fn();  
  await forgotPasswordSubmit('test@example.com','123455','12345678')(dispatch, getState);
  expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('test@example.com','123455','12345678');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction_init);
});

it("forgotPasswordSubmit error", async () => {    
  Auth.forgotPasswordSubmit = jest.fn().mockImplementation(() => {
     throw "system error";
  });
  
  const expectedAction = [{
    type :'AUTH_SYSTEM_ERROR',
    payload : "system error"
  }];

  await forgotPasswordSubmit('test@example.com','123455','12345678')(dispatch, getState);
  expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith('test@example.com','123455','12345678');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("forgotPassword success", async () => {  
  Auth.forgotPassword = jest.fn();
  
  const expectedAction=[{
    type :'AUTH_FORGOT_PASSWORD_SUCCESS',
    payload : 'test@example.com'
  }];
  
  await forgotPassword('test@example.com')(dispatch, getState);
  expect(Auth.forgotPassword).toHaveBeenCalledWith('test@example.com');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("forgotPassword error", async () => {
  Auth.forgotPassword = jest.fn().mockImplementation(() => {
    throw "system error";
  });
  
  const expectedAction = [{
    type :'AUTH_SYSTEM_ERROR',
    payload : "system error"
  }];

  await forgotPassword('test@example.com')(dispatch, getState);
  expect(Auth.forgotPassword).toHaveBeenCalledWith('test@example.com');
  expect(dispatch.mock.calls[0]).toEqual(expectedAction_beginLoading);
  expect(dispatch.mock.calls[1]).toEqual(expectedAction);
});

it("refreshToken success", async () => {
  const cognitoUser = {refreshSession: jest.fn()}
  Auth.currentAuthenticatedUser = jest.fn().mockImplementation(async () => {
    return cognitoUser;
  });
  Auth.currentSession = jest.fn().mockImplementation(async () => {
    return { getRefreshToken: jest.fn() };
  });
  await refreshToken()(dispatch, getState);
  expect(cognitoUser.refreshSession).toHaveBeenCalled();
});

it("refreshToken error", async () => {
  Auth.currentAuthenticatedUser = jest.fn().mockImplementation(async () => {
    throw "system error";
  });

  const expectedAction = [{
    type :'AUTH_SYSTEM_ERROR',
    payload : "system error"
  }];
  
  await refreshToken()(dispatch, getState);
  expect(dispatch.mock.calls[0]).toEqual(expectedAction);
});