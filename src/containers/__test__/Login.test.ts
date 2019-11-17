/*global jest,expect*/
import '@testing-library/jest-dom/extend-expect';
import {mapStateToProps, mapDispatchToProps} from '../Login';
import { getDummyAppState } from '../../testData';

it('mapStateToProps', () => {
  const props = mapStateToProps(getDummyAppState())
  expect(props.authState).toBe('signIn');
});

it('mapDispatchToProps', () => {
  const props = mapDispatchToProps(jest.fn());
  expect(/.*?signOut.*?/s.test(props.signOut.toString())).toBe(true)
  expect(/.*?value.*?changeAuthState.*?/s.test(props.changeAuthState.toString())).toBe(true);
});
