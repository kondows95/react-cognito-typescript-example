import { connect } from 'react-redux';
import ForgotPasswordSubmit from '../../components/auth/ForgotPasswordSubmit';
import { AppState, AppDispatch } from '../../types';
import { changeAuthState, forgotPasswordSubmit } from '../../modules/auth';

export const mapStateToProps = (state: AppState) => ({
  authState: state.auth.authState,
  loading: state.auth.loading,
  error: state.auth.error,
  email: state.auth.email
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeAuthState: (value: string) => dispatch(changeAuthState(value)),
  forgotPasswordSubmit: (email: string, code: string, password: string) => dispatch(forgotPasswordSubmit(email, code, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordSubmit);