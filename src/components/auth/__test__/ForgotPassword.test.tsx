import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from '../ForgotPassword';
import TestUtil from '../../../TestUtil';

let util: TestUtil;
let changeAuthState: jest.Mock;
let forgotPassword: jest.Mock;
beforeEach(() => {
  changeAuthState = jest.fn();
  forgotPassword = jest.fn();
});

describe("authState is forgotPassword",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <ForgotPassword
        authState={"forgotPassword"}
        changeAuthState={changeAuthState}
        forgotPassword={forgotPassword}
        loading={false}
        error={""}
      />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Click signinLink', () => {
    util.click('signInLink');
    expect(changeAuthState).toHaveBeenCalled();
  });

  it('Click submit button', () => {
    util.setValue('email', 'test@example.com');
    util.click('submitButton');
    expect(forgotPassword).toHaveBeenCalledWith("test@example.com");
  });
});

describe("authState is other",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <ForgotPassword
        authState={"signIn"}
        changeAuthState={changeAuthState}
        forgotPassword={forgotPassword}
        loading={true}
        error={""}
      />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Display nothing', () => {
    expect(util.render.container.textContent).toBe("");
  });
});

