/*global jest,expect*/
import '@testing-library/jest-dom/extend-expect';
import {mapStateToProps, mapDispatchToProps} from '../ForgotPassword';
import { getDummyAppState, getDummyAuthState } from '../../../testData';

it('mapStateToProps', () => {
  const props = mapStateToProps(getDummyAppState())
  expect(props.authState).toBe('signIn');
  expect(props.loading).toBe(false);
  expect(props.error).toBe(getDummyAppState().auth.error);
});

it('mapDispatchToProps', () => {
  const props = mapDispatchToProps(jest.fn());
  expect(/.*?value.*?changeAuthState.*?/s.test(props.changeAuthState.toString())).toBe(true);
  expect(/.*?email.*?forgotPassword.*?/s.test(props.forgotPassword.toString())).toBe(true);
});