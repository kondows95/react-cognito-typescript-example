
export const getInitialAuthState = () => ({
  authState: 'signIn',
  user: null,
  email: "",
  error: "",
  loading: false,
});

export const getDummyAuthState = () => ({
  ...getInitialAuthState(),
  user: { email:'test@example.com', password:'12345678' },
});

export const getDummyAppState = () => ({
  auth: getDummyAuthState()
});
