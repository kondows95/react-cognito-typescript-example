import React, {FormEvent, ChangeEvent} from 'react';
import { Box, Container, TextField}  from '@material-ui/core';
import FormTitle from './FormTitle';
import SubmitButton from './SubmitButton';

type Props = {
  authState: string | null;
  forgotPasswordSubmit: (email: string, confirmationCode:string, password:string) => void;
  loading: boolean;
  error: string;
  email: string;
};

const ForgotPasswordSubmit: React.FC<Props> = ({ authState, loading, error, email, forgotPasswordSubmit }) => {
  type Form = {　[key: string]: string　};
  const [form, setForm] = React.useState<Form>({email:"", password:"",confirmationCode:""});
  
  type FormKey = "email" | "password" | "confirmationCode";
  const handleChangeValue = (fieldName: FormKey) => (event: ChangeEvent<HTMLInputElement>) => {
    const newForm = {...form};
    newForm[fieldName] =  event.target.value;
    setForm(newForm);
  };

  const handleSubmit = (event: FormEvent)  => {
    event.preventDefault();
    forgotPasswordSubmit(email,form['confirmationCode'],form['password']);
  };

  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Please confirm your email</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              label="Confirmation Code"
              onChange={handleChangeValue("confirmationCode")} 
              value={form.confirmationCode}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"confirmationCode"}}
            />
          </Box>
          
          <Box width="100%" my={2}>
            <TextField
              label="New Password"
              type="password"
              autoComplete="new-password"
              onChange={handleChangeValue("password")}
              value={form.password}
              variant="outlined"
              required
              fullWidth
              inputProps={{"data-testid":"password"}}
            />
          </Box>
          
          <Box width="100%" mt={4} mb={2} className="relative">
            <SubmitButton　data-testid="submitButton" disabled={loading}>
              Confirm
            </SubmitButton>
          </Box>
        </Box>
      </form>
    </Container>
  );

  return (authState === 'forgotPasswordReset') ? content : null;
};

export default ForgotPasswordSubmit;