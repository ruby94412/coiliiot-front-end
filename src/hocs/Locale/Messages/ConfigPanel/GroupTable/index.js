import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.groupTable';

export default defineMessages({
  snackBarSuccess: {
    id: `${scope}.snackBarSuccess`,
    defaultMessage: 'Data Updated',
  },
  snackBarEditError: {
    id: `${scope}.snackBarEditError`,
    defaultMessage: 'Group Name Cannot Be Empty',
  },
  snackBarDeleteError: {
    id: `${scope}.snackBarDeleteError`,
    defaultMessage: 'Failed To Delete',
  },
  toolBarAddGroupButton: {
    id: `${scope}.toolBarAddGroupButton`,
    defaultMessage: 'Add Group',
  },
  editConfirm: {
    id: `${scope}.editConfirm`,
    defaultMessage: 'Please Confirm To Save This Record',
  },
  deleteConfirm: {
    id: `${scope}.deleteConfirm`,
    defaultMessage: 'Please Confirm To Delete This Record',
  },
  unsavedConfirm: {
    id: `${scope}.unsavedConfirm`,
    defaultMessage: 'Confirguration Unsaved, Please Confirm To Close This Window',
  },
});
