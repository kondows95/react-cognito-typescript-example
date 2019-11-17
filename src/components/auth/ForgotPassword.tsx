import React, {MouseEvent, FormEvent, ChangeEvent} from 'react';
import { Box, Container, Link, TextField}  from '@material-ui/core';
import FormTitle from './FormTitle';
import SubmitButton from './SubmitButton';

type Props = {
  authState: string
  changeAuthState: (state: string) => void
  forgotPassword: (email: string) => void
  loading: boolean
  error: string
};

const ForgotPassword: React.FC<Props> = ({ authState, changeAuthState, loading, error, forgotPassword }) => {
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
    forgotPassword(form['email']);
  };


  const handleSignIn = (event: MouseEvent)  => {
    event.preventDefault();
    changeAuthState('signIn');
  };

  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Reset Your Password</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              autoComplete="email"
              type="email"
              onChange={handleChangeValue("email")}
              value={form.email}
              label="Email Address"
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"email"}}
            />
          </Box>

          <Box width="100%" mt={4} mb={2} className="relative">
            <SubmitButton　data-testid="submitButton" disabled={loading}>
              Send Code
            </SubmitButton>
          </Box>
          <Box width="100%" my={2}>
            <Link data-testid="signInLink" href="#" variant="body2" onClick={handleSignIn}>
              Back to Sign in
            </Link>
          </Box>
        </Box>
      </form>
    </Container>
  );

  return (authState === 'forgotPassword') ? content : null;
};

export default ForgotPassword;