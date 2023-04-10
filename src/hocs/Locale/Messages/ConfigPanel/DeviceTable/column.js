import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.deviceTable.columns';

export default defineMessages({
  deviceId: {
    id: `${scope}.deviceId`,
    defaultMessage: 'Device ID',
  },
  deviceComment: {
    id: `${scope}.deviceComment`,
    defaultMessage: 'Device Comment',
  },
  deviceType: {
    id: `${scope}.deviceType`,
    defaultMessage: 'Device Type',
  },
  updatedTime: {
    id: `${scope}.updatedTime`,
    defaultMessage: 'Updated Time',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  connectDeviceTooltip: {
    id: `${scope}.connectDeviceTooltip`,
    defaultMessage: 'Connect To Device',
  },
  deleteDeviceTooltip: {
    id: `${scope}.deleteDeviceTooltip`,
    defaultMessage: 'Delete Device',
  },
});
