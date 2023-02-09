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

export const getInitialValues = originalConfig => {
  const rst = {serialConfigs: [], networkConfigs: []};
    for(let i=0; i<3; i++) {
      rst.serialConfigs.push({
        serialId: i, enabled: false, baudrate: 9600, dataBit: 8,
        stopBit: 1, parityMode: 2, autoPollEnabled: false, autoPollConfig: {delay: 1000, commands: []},
      });
    }
    for(let i=0; i<8; i++) {
      rst.networkConfigs.push({
        networkId: i,
        enabled: false,
        type: 0,
        socket: {
          registerMessage: '', pulseMessage: '', pulseFrequency: 30, host: '', port: 8080, socketType: 0,
        },
        aliyun: {
          regionId: 'cn-shanghai', productKey: '', deviceSecret: '',
          deviceName: '', subscribeTopic: '', publishTopic: '',
        },
        mqtt: {
          host: '', port: 8080, username: '', password: '', clientId: '',
          subscribeTopic: '', publishTopic: '',
        },
        serialId: 0,
      });
    }
    originalConfig?.serialConfigs?.forEach(origin => {
      const index = origin.serialId;
      const defaultConfig = rst.serialConfigs[index];
      rst.serialConfigs[index] = {...defaultConfig, ...origin};
    });
    originalConfig?.networkConfigs?.forEach(origin => {
      const index = origin.networkId;
      const defaultConfig = rst.networkConfigs[index];
      const {networkId, type, serialId, ...other} = origin;
      rst.networkConfigs[index] = {...defaultConfig, networkId, type, serialId, enabled: true};
      const typeArr = ['socket', 'aliyun', 'mqtt'];
      rst.networkConfigs[index][typeArr[type]] = other;
    });
    return rst; 
};