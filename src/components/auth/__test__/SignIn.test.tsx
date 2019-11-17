import React from 'react';
import SignIn from '../SignIn';
import TestUtil from '../../../TestUtil'; 

let util: TestUtil;
let changeAuthState: jest.Mock;
let signIn: jest.Mock;
beforeEach(() => {
  changeAuthState = jest.fn();
  signIn = jest.fn();
});

describe("SignIn Component",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <SignIn
        authState={"signIn"}
        changeAuthState={changeAuthState}
        signIn={signIn}
        loading={false}
        error={""}
      />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Click forgotPassword link', () => {
    util.click('forgotPasswordLink');
    expect(changeAuthState).toHaveBeenCalled();
  });

  it('Click submit button', () => {
    util.setValue('email', 'test@example.com');
    util.setValue('password', 'myPassword');
    util.click('submitButton');
    expect(signIn).toHaveBeenCalledWith("test@example.com","myPassword");
  });
});

describe("SignIn Component that loading is true",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <SignIn
        authState={"forgotPassword"}
        changeAuthState={changeAuthState}
        signIn={signIn}
        loading={true}
        error={""}
      />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });
});
