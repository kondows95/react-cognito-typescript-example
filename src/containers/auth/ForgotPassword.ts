import { connect } from 'react-redux';
import ForgotPassword from '../../components/auth/ForgotPassword';
import { AppState, AppDispatch } from '../../modules/index';
import { changeAuthState, forgotPassword } from '../../modules/auth';

export const mapStateToProps = (state: AppState) => ({
  authState: state.auth.authState,
  loading: state.auth.loading,
  error: state.auth.error,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeAuthState: (value: string) => dispatch(changeAuthState(value)),
  forgotPassword: (email: string) => dispatch(forgotPassword(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);