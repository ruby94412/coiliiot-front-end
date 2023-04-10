import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.groupTable.columns';

export default defineMessages({
  groupId: {
    id: `${scope}.groupId`,
    defaultMessage: 'Group ID',
  },
  groupName: {
    id: `${scope}.groupName`,
    defaultMessage: 'Group Name',
  },
  devices: {
    id: `${scope}.devices`,
    defaultMessage: 'Device Amount',
  },
  updatedTime: {
    id: `${scope}.updatedTime`,
    defaultMessage: 'Updated Time',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  manageGroupDeviceTooltip: {
    id: `${scope}.manageGroupDeviceTooltip`,
    defaultMessage: 'Manage Group Devices',
  },
  configGroupTooltip: {
    id: `${scope}.configGroupTooltip`,
    defaultMessage: 'Group Configuration',
  },
  deleteGroupTooltip: {
    id: `${scope}.deleteGroupTooltip`,
    defaultMessage: 'Delete Group',
  },
});
