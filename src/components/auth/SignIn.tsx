import React, {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField}  from '@material-ui/core';
import FormTitle from './FormTitle';
import SubmitButton from './SubmitButton';

type Props = {
  authState: string
  changeAuthState: (state: string) => void
  signIn: (email: string, password: string) => void
  loading: boolean
  error: string
};

const SignIn: React.FC<Props> = ({ authState, changeAuthState, signIn, loading, error }) => {
  type Form = {　[key: string]: string　};
  const [form, setForm] = React.useState<Form>({email:"", password:""});
  
  type FormKey = "email" | "password";
  const handleChangeValue = (fieldName: FormKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const newForm = {...form};
    newForm[fieldName] =  event.currentTarget.value;
    setForm(newForm);
  };
  
  const handleSubmit = (event: FormEvent)  => {
    event.preventDefault();
    signIn(form['email'], form['password']);
  };

  const handleForgotPassword = (event: MouseEvent)  => {
    event.preventDefault();
    changeAuthState('forgotPassword');
  };

  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Sign In</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              autoComplete="email"
              type="email"
              onChange={handleChangeValue('email')}
              value={form.email}
              label={loading? " " : "Email Address"}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"email"}}
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              label={loading? " " : "Password"}
              type="password"
              autoComplete="current-password"
              onChange={handleChangeValue('password')} 
              value={form.password}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"password"}}
            />
          </Box>
          <Box width="100%" mt={4} mb={2} className="relative">
            <SubmitButton　data-testid="submitButton" disabled={loading}>
              Sign In
            </SubmitButton>
          </Box>
          <Box width="100%" my={2}>
            <Link data-testid="forgotPasswordLink" href="#" variant="body2" onClick={handleForgotPassword}>
              Forgot password?
            </Link>
          </Box>
        </Box>
      </form>
    </Container>
  );
  return (authState === 'signIn') ? content : null;
};

export default SignIn;