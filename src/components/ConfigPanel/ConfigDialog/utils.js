import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';

export const renderFields = ({
  label,
  handleChange,
  fieldType,
  datatype,
  value,
  name,
  propertyName,
  ...other
}) => {
  const layout = other.layout || { xs: 12, md: 4 };
  const style = other.style || { width: '80%' };
  const { radioOptions, selectOptions } = other;
  switch (fieldType) {
    case 'radioGroup':
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              row
              value={value}
              onChange={handleChange}
              name={name}
            >
              {
                radioOptions.map((option) => (
                  <FormControlLabel
                    key={option?.value || option}
                    value={option?.label ? option.value : option}
                    control={<Radio />}
                    label={option?.label || option}
                  />
                ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    case 'select':
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>{label}</FormLabel>
            <Select
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
            >
              {
                selectOptions.map((option) => (
                  <MenuItem
                    key={option?.value || option}
                    value={option?.label ? option.value : option}
                  >
                    {option?.label || option}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
      );
    case 'blank':
      return (<Grid item {...layout} />);
    case 'OutlinedInput':
    default:
      return (
        <Grid item {...layout}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>{label}</FormLabel>
            <OutlinedInput
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
              type={datatype}
              {...other}
            />
          </FormControl>
        </Grid>
      );
  }
};

export const getInitialValues = (originalConfig) => {
  const rst = {
    basicConfigs: {}, serialConfigs: [], networkConfigs: [], autoPollConfigs: [],
  };
  rst.basicConfigs = {
    config_version: 0,
    autoUpdateEnabled: true,
    restartWhenInternetDisconnected: true,
    restartSchedule: 3,
  };
  for (let i = 0; i < 3; i++) {
    rst.serialConfigs.push({
      serialId: i,
      enabled: false,
      baudrate: 9600,
      dataBit: 8,
      stopBit: 1,
      parityMode: 2,
    });
    rst.autoPollConfigs.push({
      enabled: false,
      delay: 1000,
      commands: [],
      serialId: i,
      numberOfRetry: 3,
      timeout: 1,
    });
  }
  for (let i = 0; i < 8; i++) {
    rst.networkConfigs.push({
      networkId: i,
      enabled: false,
      type: 0,
      socket: {
        registerMessage: '',
        pulseMessage: '',
        pulseFrequency: 30,
        host: '',
        port: 8080,
        socketType: 0,
        autoPollInterval: 1000,
      },
      aliyun: {
        regionId: 'cn-shanghai',
        productKey: '',
        deviceSecret: '',
        deviceName: '',
        subscribeTopic: '',
        publishTopic: '',
      },
      mqtt: {
        host: '',
        port: 8080,
        username: '',
        password: '',
        clientId: '',
        subscribeTopic: '',
        publishTopic: '',
        retain: 0,
        lwtMessage: '',
        qos: 0,
        cleanSession: true,
      },
      serialId: 0,
    });
  }
  if (originalConfig?.basicConfigs) {
    const origin = originalConfig.basicConfigs;
    const defaultConfig = rst.basicConfigs;
    rst.basicConfigs = { ...defaultConfig, ...origin };
  }
  originalConfig?.serialConfigs?.forEach((origin) => {
    const index = origin.serialId;
    const defaultConfig = rst.serialConfigs[index];
    rst.serialConfigs[index] = { ...defaultConfig, ...origin };
  });
  originalConfig?.autoPollConfigs?.forEach((origin) => {
    const index = origin.serialId;
    const defaultConfig = rst.autoPollConfigs[index];
    rst.autoPollConfigs[index] = { ...defaultConfig, ...origin };
  });
  originalConfig?.networkConfigs?.forEach((origin) => {
    const index = origin.networkId;
    const defaultConfig = rst.networkConfigs[index];
    const {
      networkId, type, serialId, conversionConfigs, ...other
    } = origin;
    rst.networkConfigs[index] = {
      ...defaultConfig, networkId, type, serialId, enabled: true, conversionConfigs,
    };
    const typeArr = ['socket', 'aliyun', 'mqtt'];
    rst.networkConfigs[index][typeArr[type]] = other;
  });
  return rst;
};

export const getCommandDetail = ({
  slaveId,
  functionCode,
  registerOffset,
  numberOfRegisters,
}) => {
  const dec = [];
  const hex = [];
  const rawDec = [slaveId, functionCode, registerOffset, numberOfRegisters];
  dec.push(Number(slaveId));
  dec.push(Number(functionCode));

  let temp = Number(registerOffset).toString(16);
  while (temp.length < 4) temp = `0${temp}`;
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.push(Number(`0x${temp.substring(2)}`));
  temp = Number(numberOfRegisters).toString(16);
  while (temp.length < 4) temp = `0${temp}`;
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.push(Number(`0x${temp.substring(2)}`));
  let crc = 0xFFFF;
  let odd;
  for (let i = 0; i < dec.length; i++) {
    crc ^= dec[i];
    for (let j = 0; j < 8; j++) {
      odd = crc & 0x0001;
      crc >>= 1;
      if (odd) {
        crc ^= 0xA001;
      }
    }
  }
  rawDec.push(crc);
  temp = crc.toString(16);
  dec.push(Number(`0x${temp.substring(2)}`));
  dec.push(Number(`0x${temp.substring(0, 2)}`));
  dec.forEach((num) => {
    let s = num.toString(16);
    while (s.length < 2) s = `0${s}`;
    hex.push(s.toUpperCase());
  });
  const rst = {
    slaveId: { dec: dec[0], hex: hex[0] },
    functionCode: { dec: dec[1], hex: hex[1] },
    registerOffset: {
      dec: registerOffset, decArr: [dec[2], dec[3]], hexArr: [hex[2], hex[3]], hex: hex[2] + hex[3],
    },
    numberOfRegisters: {
      dec: numberOfRegisters,
      decArr: [dec[4], dec[5]],
      hexArr: [hex[4], hex[5]],
      hex: hex[4] + hex[5],
    },
    crc: {
      dec: crc, decArr: [dec[6], dec[7]], hexArr: [hex[6], hex[7]], hex: hex[6] + hex[7],
    },
    hex,
    dec,
    rawDec,
  };
  return rst;
};

export const getUid = (type) => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  switch (type) {
    case 'user':
      return `${s4() + s4()}-${s4()}-${s4()}`;
    case 'group':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}`;
    case 'device':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    case 'token':
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}-${s4()}${s4()}${s4()}${s4()}`;
    default:
      return `${s4()}${s4()}${s4()}${s4()}`;
  }
};

export const convertRawCommands = (autoPollConfig) => {
  if (!autoPollConfig || !autoPollConfig.commands?.length) return [];
  const temp = autoPollConfig.commands?.map((command) => {
    const rst = {
      slaveId: command.rawDec[0],
      functionCode: command.rawDec[1],
      registerOffset: command.rawDec[2],
      numberOfRegisters: command.rawDec[3],
    };
    const commandDetail = getCommandDetail(rst);
    rst.detail = commandDetail;
    rst.period = command.period;
    rst.id = command.id;
    return rst;
  });
  return temp;
};

export const renderCommandDetail = ({
  slaveId,
  functionCode,
  registerOffset,
  numberOfRegisters,
}, {
  slaveIdLabel,
  functionCodeLabel,
  registerOffestLabel,
  numberOfRegistersLabel,
  requestLabel,
  decimalLabel,
  hexLabel,
  crcLabel,
}) => {
  const command = getCommandDetail({
    slaveId,
    functionCode,
    registerOffset,
    numberOfRegisters,
  });
  const maxLen = Math.max(
    slaveIdLabel.length,
    functionCodeLabel.length,
    registerOffestLabel.length,
    numberOfRegistersLabel.length,
  );
  const getFlexSpaces = (label, len) => {
    let rst = '';
    while (rst.length + label.length < len) rst = `${rst} `;
    return rst;
  };
  const getSameLen = (label, len) => {
    let rst = label.toString();
    while (rst.length < len) rst = ` ${rst}`;
    return rst;
  };
  const startAddress = [0, 0, 10001, 40001, 30001];
  return `${slaveIdLabel}:${getFlexSpaces(slaveIdLabel, maxLen)} ${getSameLen(command.slaveId.dec, 6)} (${decimalLabel}) |    ${command.slaveId.hex} (${hexLabel})
${functionCodeLabel}:${getFlexSpaces(functionCodeLabel, maxLen)} ${getSameLen(command.functionCode.dec, 6)} (${decimalLabel}) |    ${command.functionCode.hex} (${hexLabel})
${registerOffestLabel}:${getFlexSpaces(registerOffestLabel, maxLen)} ${getSameLen(command.registerOffset.dec, 6)} (${decimalLabel}) |  ${command.registerOffset.hex} (${hexLabel})
${numberOfRegistersLabel}:${getFlexSpaces(numberOfRegistersLabel, maxLen)} ${getSameLen(command.numberOfRegisters.dec, 6)} (${decimalLabel}) |  ${command.numberOfRegisters.hex} (${hexLabel})

${crcLabel}:${getFlexSpaces(crcLabel, maxLen)} ${getSameLen(command.crc.dec, 6)} (${decimalLabel}) |  ${command.crc.hex} (${hexLabel})

${requestLabel}: [${command.slaveId.hex}] [${command.functionCode.hex}] [${command.registerOffset.hex}] [${command.numberOfRegisters.hex}] [${command.crc.hex}]
         |    |    |      |      |-> ${crcLabel} (${command.crc.dec})
         |    |    |      |-> ${numberOfRegistersLabel} (${command.numberOfRegisters.dec})
         |    |    |-> ${registerOffestLabel} (${command.registerOffset.dec} = ${Number(command.registerOffset.dec) + startAddress[command.functionCode.dec]})
         |    |-> ${functionCodeLabel} (${command.functionCode.dec})
         |-> ${slaveIdLabel} (${command.slaveId.dec})`;
};

export const handleFormDataSubmit = (values) => {
  const config = {
    basicConfigs: {},
    serialConfigs: [],
    networkConfigs: [],
    networkSummary: { socket: [], aliyun: [], mqtt: [] },
  };
  config.basicConfigs = values.basicConfigs;
  values.serialConfigs.forEach((ele) => {
    if (ele.enabled) {
      const { autoPollEnabled, autoPollConfig, ...other } = ele;
      if (autoPollEnabled) {
        config.serialConfigs.push(ele);
      } else {
        config.serialConfigs.push({ autoPollEnabled, ...other });
      }
    }
  });
  let autoTaskCount = 0;
  values.networkConfigs.forEach((ele) => {
    if (ele.enabled) {
      const {
        enabled, serialId, type, networkId, conversionConfigs,
      } = ele;
      if (config.serialConfigs[serialId].autoPollEnabled) autoTaskCount++;
      const typeArr = ['socket', 'aliyun', 'mqtt'];
      const detail = ele[typeArr[type]];
      config.networkSummary[typeArr[type]].push(networkId);
      config.networkConfigs.push({
        enabled, serialId, type, networkId, conversionConfigs, ...detail,
      });
    }
  });
  config.config_version = new Date().toString();
  config.autoTaskCount = autoTaskCount;
  return config;
};
