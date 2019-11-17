/*global jest,expect*/
import '@testing-library/jest-dom/extend-expect';
import {mapStateToProps, mapDispatchToProps} from '../ForgotPasswordSubmit';
import { getDummyAppState, getDummyAuthState } from '../../../testData';

it('mapStateToProps', () => {
  const props = mapStateToProps(getDummyAppState())
  expect(props.authState).toBe('signIn');
  expect(props.loading).toBe(false);
  expect(props.error).toBe(getDummyAppState().auth.error);
  expect(props.email).toBe(getDummyAppState().auth.email);
});

it('mapDispatchToProps', () => {
  const props = mapDispatchToProps(jest.fn());
  expect(/.*?value.*?changeAuthState.*?/s.test(props.changeAuthState.toString())).toBe(true);
  expect(/.*?email.*?forgotPasswordSubmit.*?/s.test(props.forgotPasswordSubmit.toString())).toBe(true);
});