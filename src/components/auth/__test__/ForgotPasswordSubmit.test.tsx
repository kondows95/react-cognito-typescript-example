import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPasswordSubmit from '../ForgotPasswordSubmit';
import TestUtil from '../../../TestUtil'; 

let util: TestUtil;
let forgotPasswordSubmit: jest.Mock;
beforeEach(() => {
  forgotPasswordSubmit = jest.fn();
});

describe("authState is forgotPasswordReset",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <ForgotPasswordSubmit
        authState={"forgotPasswordReset"}
        forgotPasswordSubmit={forgotPasswordSubmit}
        loading={false}
        error={""}
        email={"test@example.com"}
      />
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Click submit button', () => {
    util.setValue('confirmationCode', '12345');
    util.setValue('password', 'myPassword');
    util.click('submitButton');
    expect(forgotPasswordSubmit).toHaveBeenCalledWith("test@example.com","12345","myPassword");
  });
});

describe("authState is other",()=>{
  beforeEach(() => {
    util= new TestUtil(
      <ForgotPasswordSubmit
        authState={"signIn"}
        forgotPasswordSubmit={forgotPasswordSubmit}
        loading={true}
        error={""}
        email={"test@example.com"}
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

