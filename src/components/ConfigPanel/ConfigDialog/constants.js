import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/constants';

export const networkIds = [0, 1, 2, 3, 4, 5, 6, 7];

export const networkOptions = [
  { label: 'Socket', value: 0 },
  { label: <FormattedMessage {...messages.aliyun} />, value: 1 },
  { label: 'MQTT', value: 2 },
];

export const basicFields = [
  {
    label: <FormattedMessage {...messages.configVersion} />,
    propertyName: 'config_version',
    datatype: 'number',
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.autoUpdate} />,
    propertyName: 'autoUpdateEnabled',
    datatype: 'boolean',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.enable} />, value: true },
      { label: <FormattedMessage {...messages.disable} />, value: false },
    ],
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.periodicalRestart} />,
    propertyName: 'restartSchedule',
    datatype: 'number',
    layout: { xs: 12, md: 6 },
  },
  {
    label: <FormattedMessage {...messages.restartWhenInternetDisconnected} />,
    propertyName: 'restartWhenInternetDisconnected',
    datatype: 'boolean',
    fieldType: 'radioGroup',
    radioOptions: [
      { label: <FormattedMessage {...messages.enable} />, value: true },
      { label: <FormattedMessage {...messages.disable} />, value: false },
    ],
    layout: { xs: 12, md: 6 },
  },
];

export const socketFields = [
  {
    label: <FormattedMessage {...messages.type} />,
    propertyName: 'socketType',
    fieldType: 'radioGroup',
    radioOptions: [{ label: 'TCP', value: 0 }, { label: 'UDP', value: 1 }],
  },
  { label: <FormattedMessage {...messages.registerMessage} />, propertyName: 'registerMessage', datatype: 'text' },
  { label: <FormattedMessage {...messages.pulseMessage} />, propertyName: 'pulseMessage', datatype: 'text' },
  { label: <FormattedMessage {...messages.pulseFrequency} />, propertyName: 'pulseFrequency', datatype: 'number' },
  { label: <FormattedMessage {...messages.host} />, propertyName: 'host', datatype: 'text' },
  { label: <FormattedMessage {...messages.port} />, propertyName: 'port', datatype: 'number' },
  { label: <FormattedMessage {...messages.autoPollInterval} />, propertyName: 'autoPollInterval', datatype: 'number' },
];

export const aliyunFields = [
  { label: <FormattedMessage {...messages.regionId} />, propertyName: 'regionId', datatype: 'text' },
  { label: 'ProductKey', propertyName: 'productKey', datatype: 'text' },
  { label: 'DeviceSecret', propertyName: 'deviceSecret', datatype: 'text' },
  { label: 'DeviceName', propertyName: 'deviceName', datatype: 'text' },
  { label: <FormattedMessage {...messages.subscribeTopic} />, propertyName: 'subscribeTopic', datatype: 'text' },
  { label: <FormattedMessage {...messages.publishTopic} />, propertyName: 'publishTopic', datatype: 'text' },
];

export const mqttFields = [
  { label: <FormattedMessage {...messages.host} />, propertyName: 'host', datatype: 'text' },
  { label: <FormattedMessage {...messages.port} />, propertyName: 'port', datatype: 'number' },
  { label: <FormattedMessage {...messages.username} />, propertyName: 'username', datatype: 'text' },
  { label: <FormattedMessage {...messages.password} />, propertyName: 'password', datatype: 'text' },
  { label: 'ClientID', propertyName: 'clientId', datatype: 'text' },
  { label: <FormattedMessage {...messages.subscribeTopic} />, propertyName: 'subscribeTopic', datatype: 'text' },
  { label: <FormattedMessage {...messages.publishTopic} />, propertyName: 'publishTopic', datatype: 'text' },
];

export const serialFields = [
  {
    label: <FormattedMessage {...messages.baudrate} />,
    propertyName: 'baudrate',
    fieldType: 'select',
    selectOptions: [1200, 2400, 4800, 9600, 14400,
      19200, 28800, 57600, 115200, 230400, 460800, 921600],
  },
  {
    label: <FormattedMessage {...messages.dataBit} />,
    propertyName: 'dataBit',
    fieldType: 'radioGroup',
    radioOptions: [7, 8],
  },
  {
    label: <FormattedMessage {...messages.parityMode} />,
    propertyName: 'parityMode',
    fieldType: 'radioGroup',
    layout: { xs: 12, md: 8 },
    radioOptions: [{ label: 'UART.PAR_EVEN', value: 0 }, { label: 'UART.PAR_ODD', value: 1 },
      { label: 'UART.PAR_NONE', value: 2 }],
  },
  {
    label: <FormattedMessage {...messages.stopBit} />,
    propertyName: 'stopBit',
    fieldType: 'radioGroup',
    radioOptions: [1, 2],
  },
];
