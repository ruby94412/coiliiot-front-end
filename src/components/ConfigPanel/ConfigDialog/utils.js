import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  TextField,
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
  const layout = other.layout || {xs:12, md: 4};
  const style = other.style || {width: '80%'};
  switch (fieldType) {
    default:
    case 'textField':
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <TextField
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
    case 'radioGroup':
      const {radioOptions} = other;
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
              row
              value={value}
              onChange={handleChange}
              name={name}
            >
              {
                radioOptions.map(option => (
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
      const {selectOptions} = other;
      return (
        <Grid item {...layout}>
          <FormControl sx={{display: 'flex'}}>
            <FormLabel>{label}</FormLabel>
            <Select
              size="small"
              style={style}
              value={value}
              name={name}
              onChange={handleChange}
            >
              {
                selectOptions.map(option => (
                  <MenuItem key={option?.label || option} value={option?.label ? option.value : option}>
                    {option?.label || option}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>     
        </Grid>
      );
  }
};

export const getInitialValues = originalConfig => {
  const rst = {serialConfigs: [], networkConfigs: []};
    for(let i=0; i<3; i++) {
      rst.serialConfigs.push({
        serialId: i, enabled: false, baudrate: 9600, dataBit: 8,
        stopBit: 1, parityMode: 2, autoPollEnabled: false, autoPollConfig: {delay: 1000, commands: [], serialId: i},
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