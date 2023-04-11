import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.dialogContent';

export default defineMessages({
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Data Updated',
  },
  snackBarError: {
    id: `${scope}.snackBarError`,
    defaultMessage: 'Update Error',
  },
  basicTabLabel: {
    id: `${scope}.basicTabLabel`,
    defaultMessage: 'Basic',
  },
  serialTabLabel: {
    id: `${scope}.serialTabLabel`,
    defaultMessage: 'Serial',
  },
  networkTabLabel: {
    id: `${scope}.networkTabLabel`,
    defaultMessage: 'Network',
  },
  cancelButton: {
    id: `${scope}.cancelButton`,
    defaultMessage: 'Cancel',
  },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
});
