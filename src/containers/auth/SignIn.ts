import { connect } from 'react-redux';
import SignIn from '../../components/auth/SignIn';
import { AppState, AppDispatch } from '../../modules/index';
import { changeAuthState, signIn } from '../../modules/auth';

export const mapStateToProps = (state: AppState) => ({
  authState: state.auth.authState,
  loading: state.auth.loading,
  error: state.auth.error,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeAuthState: (value: string) => dispatch(changeAuthState(value)),
  signIn: (email: string, password: string) => dispatch(signIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);


