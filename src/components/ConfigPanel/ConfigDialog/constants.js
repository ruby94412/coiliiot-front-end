export const networkIds = [0, 1, 2, 3, 4, 5, 6, 7];

export const networkOptions = [{label: 'Socket', value: 0}, {label: '阿里云', value: 1}, {label: 'MQTT', value: 2}];

export const socketFields = [
  {label: '类型', propertyName: 'socketType', fieldType: 'radioGroup',
    radioOptions: [{label: 'TCP', value: 0}, {label: 'UDP', value: 1}]},
  {label: '注册包', propertyName: 'registerMessage', datatype: 'text'},
  {label: '心跳包', propertyName: 'pulseMessage', datatype: 'text'},
  {label: '心跳包间隔', propertyName: 'pulseFrequency', datatype: 'number'},
  {label: '服务器地址', propertyName: 'host', datatype: 'text'},
  {label: '端口号', propertyName: 'port', datatype: 'number'},
  {label: '主动轮训间隔时间', propertyName: 'autoPollInterval', datatype: 'number'},
];

export const aliyunFields = [
  {label: '区域ID', propertyName: 'regionId', datatype: 'text'},
  {label: 'ProductKey', propertyName: 'productKey', datatype: 'text'},
  {label: 'DeviceSecret', propertyName: 'deviceSecret', datatype: 'text'},
  {label: 'DeviceName', propertyName: 'deviceName', datatype: 'text'},
  {label: '订阅主题', propertyName: 'subscribeTopic', datatype: 'text'},
  {label: '发布主题', propertyName: 'publishTopic', datatype: 'text'},
];

export const mqttFields = [
  {label: '服务器地址', propertyName: 'host', datatype: 'text'},
  {label: '端口号', propertyName: 'port', datatype: 'number'},
  {label: '用户名', propertyName: 'username', datatype: 'text'},
  {label: '密码', propertyName: 'password', datatype: 'text'},
  {label: 'ClientID', propertyName: 'clientId', datatype: 'text'},
  {label: '订阅主题', propertyName: 'subscribeTopic', datatype: 'text'},
  {label: '发布主题', propertyName: 'publishTopic', datatype: 'text'},
];

export const serialFields = [
  {label: '波特率', propertyName: 'baudrate', fieldType: 'select',
    selectOptions: [1200, 2400, 4800, 9600, 14400,
    19200, 28800, 57600, 115200, 230400, 460800, 921600],
  },
  {label: '数据位', propertyName: 'dataBit', fieldType: 'radioGroup',
    radioOptions: [7, 8],
  },
  {label: '校验位', propertyName: 'parityMode', fieldType: 'radioGroup', layout: {xs: 12, md: 8},
    radioOptions: [{label: 'UART.PAR_EVEN', value: 0}, {label: 'UART.PAR_ODD', value: 1},
    {label: 'UART.PAR_NONE', value: 2}],
  },
  {label: '停止位', propertyName: 'stopBit', fieldType: 'radioGroup',
    radioOptions: [1, 2],
  },
];