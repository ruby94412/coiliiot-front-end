import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.platform';

export default defineMessages({
  networkIdLabel: {
    id: `${scope}.networkIdLabel`,
    defaultMessage: 'Network Channel ID',
  },
  serialIdLabel: {
    id: `${scope}.serialIdLabel`,
    defaultMessage: 'Serial Channel ID',
  },
  platformTypeLabel: {
    id: `${scope}.platformTypeLabel`,
    defaultMessage: 'Platform Type',
  },
  statusLabel: {
    id: `${scope}.statusLabel`,
    defaultMessage: 'Status',
  },
  statusOptionEnable: {
    id: `${scope}.statusOptionEnable`,
    defaultMessage: 'Enable',
  },
  statusOptionDisable: {
    id: `${scope}.statusOptionDisable`,
    defaultMessage: 'Disable',
  },
});
