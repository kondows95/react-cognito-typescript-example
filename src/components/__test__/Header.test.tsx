/*global jest,expect*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Parent from '../Parent';
import Header from '../Header';
import TestUtil from '../../TestUtil';

let signOut : jest.Mock;
let util: TestUtil;
beforeEach(() => {
  signOut = jest.fn();
  util = new TestUtil(<Parent><Header signOut={signOut} /></Parent>);
});

it('Snapshot', () => {
  expect(util.render.asFragment()).toMatchSnapshot();
});

it('Open menu and click signout button', () => {
  util.click('openMenuButton');
  util.click('signoutMenuItem');
  expect(signOut).toHaveBeenCalled();   
});