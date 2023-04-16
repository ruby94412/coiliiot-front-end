import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.autoPoll';

export default defineMessages({
  serialIdLabel: {
    id: `${scope}.serialIdLabel`,
    defaultMessage: 'Serial Channel ID',
  },
  autoPollLabel: {
    id: `${scope}.autoPollLabel`,
    defaultMessage: 'Auto Data Polling',
  },
  autoPollOptionEnable: {
    id: `${scope}.autoPollOptionEnable`,
    defaultMessage: 'Enable',
  },
  autoPollOptionDisable: {
    id: `${scope}.autoPollOptionDisable`,
    defaultMessage: 'Disable',
  },
  commandLabel: {
    id: `${scope}.commandLabel`,
    defaultMessage: 'Command',
  },
  commandsIntervalLabel: {
    id: `${scope}.commandsIntervalLabel`,
    defaultMessage: 'Interval Between Commands',
  },
  commandHelperText: {
    id: `${scope}.commandHelperText`,
    defaultMessage: 'E.g: 01 04 00 00 00 01 31 CA',
  },
  commandGeneratorButton: {
    id: `${scope}.commandGeneratorButton`,
    defaultMessage: 'Add Command',
  },
});
