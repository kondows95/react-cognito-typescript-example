import { connect } from 'react-redux';
import Login from '../components/Login';
import { changeAuthState, signOut } from '../modules/auth';
import { AppState, AppDispatch } from '../modules/index';

export const mapStateToProps = (state: AppState) => ({
  authState: state.auth.authState,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signOut: () => dispatch(signOut()),
  changeAuthState: (value: string) => dispatch(changeAuthState(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

