import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.dataConversion';

export default defineMessages({
  networkDisabledText: {
    id: `${scope}.networkDisabledText`,
    defaultMessage: 'This Network Channel Is Not Enabled Yet',
  },
  autoPollDisabledText: {
    id: `${scope}.autoPollDisabledText`,
    defaultMessage: 'This Serial Channel Has No Auto Polling Yet',
  },
  noNetworkConfigedText: {
    id: `${scope}.noNetworkConfigedText`,
    defaultMessage: 'This Serial Channel Has Not Configured A Connected Network Channel',
  },
});
