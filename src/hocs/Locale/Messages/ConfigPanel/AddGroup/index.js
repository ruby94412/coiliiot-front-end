import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.addGroup';

export default defineMessages({
  validateGroupName: {
    id: `${scope}.validateGroupName`,
    defaultMessage: 'Please Enter Group Name',
  },
  addGroupTypography: {
    id: `${scope}.addGroupTypography`,
    defaultMessage: 'Add Group',
  },
  groupNameLabel: {
    id: `${scope}.groupNameLabel`,
    defaultMessage: 'Group Name',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  addGroupError: {
    id: `${scope}.addGroupError`,
    defaultMessage: 'Failed To Group',
  },
});
