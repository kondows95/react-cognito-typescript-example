import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme';
import Header from '../containers/Header';
import Login from '../containers/Login';
import { CognitoUser } from '@aws-amplify/auth';

type Props = {
  user: CognitoUser | null
  fetchAuthedUser: () => void
  refreshToken: () => void
};

const App: React.FC<Props> = ({ user, fetchAuthedUser, refreshToken }) => {
  const isFirstRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser();
    }
  });

  /*React.useEffect(() => {
    const timer = window.setInterval(() => {
      refreshToken();
    }, 1); 
    return () => { 
      window.clearInterval(timer);
    };
  });*/

  const contents = <Header />;

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        {user ? contents : <Login />}
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

