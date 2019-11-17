import React from 'react';
import Box from '@material-ui/core/Box';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SignIn from '../containers/auth/SignIn';
import ForgotPassword from '../containers/auth/ForgotPassword';
import ForgotPasswordSubmit from '../containers/auth/ForgotPasswordSubmit';

interface Props extends RouteComponentProps<{}> {
  authState: string | null
}
const Login: React.FC<Props> = ({authState}) => {
   const contents = (
    <React.Fragment>
      <SignIn />
      <ForgotPassword />
      <ForgotPasswordSubmit />
    </React.Fragment>
  );
  return (
    <Box flexGrow={1} textAlign="center" >
      { authState ? contents : null }
    </Box>  
  );
};
export default withRouter(Login);