import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.login';

export default defineMessages({
  usernameErrorNotification: {
    id: `${scope}.usernameErrorNotification`,
    defaultMessage: 'Please Enter Username',
  },
  passwordErrorNotification: {
    id: `${scope}.passwordErrorNotification`,
    defaultMessage: 'Please Enter Password',
  },
  usernameLabel: {
    id: `${scope}.usernameLabel`,
    defaultMessage: 'Username',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  loginButtonLabel: {
    id: `${scope}.loginButtonLabel`,
    defaultMessage: 'Login',
  },
});
