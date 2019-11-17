/*global jest,expect*/
import '@testing-library/jest-dom/extend-expect';
import {mapStateToProps, mapDispatchToProps} from '../App';
import { getDummyAppState, getDummyAuthState } from '../../testData';

it('mapStateToProps', () => {
  const props = mapStateToProps(getDummyAppState())
  expect(props.authState).toBe('signIn');
  expect(props.user).toEqual(getDummyAuthState().user);
  expect(props.loading).toBe(false);
});

it('mapDispatchToProps', () => {
  const props = mapDispatchToProps(jest.fn());
  expect(/.*?fetchAuthedUser.*?/s.test(props.fetchAuthedUser.toString())).toBe(true);
  expect(/.*?refreshToken.*?/s.test(props.refreshToken.toString())).toBe(true);
});