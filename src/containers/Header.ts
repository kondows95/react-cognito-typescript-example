import { connect } from 'react-redux';
import Header from '../components/Header';
import { AppState, AppDispatch } from '../types';
import { signOut } from '../modules/auth';

export const mapStateToProps = (state: AppState) => ({
  authState: state.auth.authState,
  user: state.auth.user,
  loading: state.auth.loading,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
