export const networkIds = [0, 1, 2, 3, 4, 5, 6, 7];

export const networkOptions = [{label: 'Socket', value: 0}, {label: '阿里云', value: 1}, {label: 'MQTT', value: 2}];

export const socketFields = [
  {label: '类型', propertyName: 'socketType', dataType: 'number'},
  {label: '注册包', propertyName: 'registerMessage', dataType: 'text'},
  {label: '心跳包', propertyName: 'pulseMessage', dataType: 'text'},
  {label: '心跳包间隔', propertyName: 'pulseFrequency', dataType: 'number'},
  {label: '服务器地址', propertyName: 'host', dataType: 'text'},
  {label: '端口号', propertyName: 'port', dataType: 'number'},
];

export const aliyunFields = [
  {label: '区域ID', propertyName: 'regionId', dataType: 'text'},
  {label: 'ProductKey', propertyName: 'productKey', dataType: 'text'},
  {label: 'DeviceSecret', propertyName: 'deviceSecret', dataType: 'text'},
  {label: 'DeviceName', propertyName: 'deviceName', dataType: 'text'},
  {label: '订阅主题', propertyName: 'subscribeTopic', dataType: 'text'},
  {label: '发布主题', propertyName: 'publishTopic', dataType: 'text'},
];

export const mqttFields = [
  {label: '服务器地址', propertyName: 'host', dataType: 'text'},
  {label: '端口号', propertyName: 'port', dataType: 'number'},
  {label: '用户名', propertyName: 'username', dataType: 'text'},
  {label: '密码', propertyName: 'password', dataType: 'text'},
  {label: 'ClientID', propertyName: 'clientId', dataType: 'text'},
  {label: '订阅主题', propertyName: 'subscribeTopic', dataType: 'text'},
  {label: '发布主题', propertyName: 'publishTopic', dataType: 'text'},
];

export const getInitialValues = originalConfig => {
  const rst = {serialConfigs: [], networkConfigs: []};
    for(let i=0; i<3; i++) {
      rst.serialConfigs.push({
        serialId: i, enabled: false, baudrate: 9600, dataBit: 8, stopBit: 1, parityMode: 2,
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