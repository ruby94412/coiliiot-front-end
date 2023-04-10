import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.serial';

export default defineMessages({
  serialIdLabel: {
    id: `${scope}.serialIdLabel`,
    defaultMessage: 'Serial Channel ID',
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
