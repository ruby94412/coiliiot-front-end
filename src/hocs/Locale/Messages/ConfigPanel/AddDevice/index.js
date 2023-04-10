import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.addDevice';

export default defineMessages({
  validateDeviceId: {
    id: `${scope}.validateDeviceId`,
    defaultMessage: 'Please Enter Device ID',
  },
  validateDeviceType: {
    id: `${scope}.validateDeviceType`,
    defaultMessage: 'Please Choose Device Type',
  },
  addDeviceTypography: {
    id: `${scope}.addDeviceTypography`,
    defaultMessage: 'Add Device',
  },
  deviceIdLabel: {
    id: `${scope}.deviceIdLabel`,
    defaultMessage: 'Device ID',
  },
  deviceTypeLabel: {
    id: `${scope}.deviceTypeLabel`,
    defaultMessage: 'Device Type',
  },
  deviceCommentLabel: {
    id: `${scope}.deviceCommentLabel`,
    defaultMessage: 'Device Comment',
  },
  confirmButton: {
    id: `${scope}.confirmButton`,
    defaultMessage: 'Confirm',
  },
  addDeviceError: {
    id: `${scope}.addDeviceError`,
    defaultMessage: 'Failed To Device',
  },
});
