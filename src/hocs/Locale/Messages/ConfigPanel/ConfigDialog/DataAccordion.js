import { defineMessages } from 'react-intl';

export const scope = 'coiliiot.app.configPanel.configDialog.dataAccordion';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Configure Mapping',
  },
  addMappingButton: {
    id: `${scope}.addMappingButton`,
    defaultMessage: 'Add Mapping',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm',
  },
  commandDetail: {
    id: `${scope}.commandDetail`,
    defaultMessage: 'Command Detail',
  },
  addPropertyButton: {
    id: `${scope}.addPropertyButton`,
    defaultMessage: 'Add Custom Property',
  },
  propertyKey: {
    id: `${scope}.propertyKey`,
    defaultMessage: 'Key',
  },
  propertyValue: {
    id: `${scope}.propertyValue`,
    defaultMessage: 'Value',
  },
});
