export const LOGIN_REQUEST = 'EvtX:Server:auth:login';
export const USER_LOGGED = 'auth:logged';
export const USER_LOGOUT = 'auth:logout';

export const loginRequest = ({ email, idToken }) => ({
  type: LOGIN_REQUEST,
  replyTo: USER_LOGGED,
  payload: { email, idToken },
});

export const logout = () => ({ type: USER_LOGOUT });
