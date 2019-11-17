/*global jest,expect*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Parent from '../Parent';
import App from '../App';
import TestUtil from '../../TestUtil';
import { CognitoUser } from '@aws-amplify/auth';

let refreshToken: jest.Mock;
let fetchAuthedUser: jest.Mock;
beforeEach(() => {
  refreshToken = jest.fn();
  fetchAuthedUser = jest.fn();
});

describe("User is null",()=>{
  let util: TestUtil;
  beforeEach(() => {
    util = new TestUtil(
      <Parent> 
        <App
          user={null}
          fetchAuthedUser={fetchAuthedUser}
          refreshToken={refreshToken}
        />
      </Parent>
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Header is not displayed', () => {
    expect(util.render.container).not.toHaveTextContent("Management Console");
  });

  it('Re-rendering', () => {
    for (let i=0; i<2; i++) {
      util.render.rerender(
        <Parent> 
          <App
            user={{} as CognitoUser}
            fetchAuthedUser={fetchAuthedUser}
            refreshToken={refreshToken}
          />
        </Parent>
      );
      expect(fetchAuthedUser).toHaveBeenCalledTimes(1);
    }
  });
});

describe("User is not null",()=>{
  const user = {} as CognitoUser;
  let util: TestUtil;
  beforeEach(() => {
    util = new TestUtil(
      <Parent> 
        <App
          user={user}
          fetchAuthedUser={fetchAuthedUser}
          refreshToken={refreshToken}
        />
      </Parent>
    );
  });

  it('Snapshot', () => {
    expect(util.render.asFragment()).toMatchSnapshot();
  });

  it('Header is displayed', () => {
    expect(util.render.container).toHaveTextContent("Management Console");
  });
});
