/*global jest,expect*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Parent from '../Parent';
import Login from '../Login';
import TestUtil from '../../TestUtil';
let util: TestUtil;

describe("AsuthState is null", () => { 
  beforeEach(() => {
    util= new TestUtil(
      <Parent> 
        <Login authState={null}/> 
      </Parent> 
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });
  
  it('Display nothing', () => {
    expect(util.render.container.textContent).toBe("");
  });
});

describe("AsuthState is SignIn", () => { 
  beforeEach(() => {
    util= new TestUtil(
      <Parent> 
        <Login authState={"signIn"}/> 
      </Parent> 
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('SignIn page is displayed', () => {
    expect(util.get("submitButton")).toHaveTextContent("Sign In");
  });
});
