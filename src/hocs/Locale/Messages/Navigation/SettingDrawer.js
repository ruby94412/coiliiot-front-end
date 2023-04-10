import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.navigation.settingDrawer';

export default defineMessages({
  settingTitle: {
    id: `${scope}.settingTitle`,
    defaultMessage: 'Settings',
  },
  modeTitle: {
    id: `${scope}.modeTitle`,
    defaultMessage: 'Mode',
  },
  modeLight: {
    id: `${scope}.modeLight`,
    defaultMessage: 'Light',
  },
  modeDark: {
    id: `${scope}.modeDark`,
    defaultMessage: 'Dark',
  },
  languageTitle: {
    id: `${scope}.languageTitle`,
    defaultMessage: 'Language',
  },
});
