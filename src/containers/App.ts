import { connect } from 'react-redux';
import App from '../components/App';
import { AppState, AppDispatch } from '../types';
import { fetchAuthedUser,refreshToken } from '../modules/auth';

export const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  authState: state.auth.authState,
  loading: state.auth.loading,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchAuthedUser: () => dispatch(fetchAuthedUser()),
  refreshToken: () => dispatch(refreshToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);