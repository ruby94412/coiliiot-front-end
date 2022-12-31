import {useState, Fragment} from 'react';
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
import TabPanel from '../../common/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import {networkIds, networkOptions, tcpFields, aliyunFields, mqttFields} from './constants';

const Platform = ({
  formik,
}) => {
  const [networkId, setNetworkId] = useState(0);
  const handleNetworkIdChange = event => {
    setNetworkId(Number(event.target.value));
  };

  const handleEnabledChange = e => {
    formik.setFieldValue(`networkConfigs[${networkId}].enabled`, e.target.value === 'true');
  };

  const renderTextField = ({label, propertyName, dataType, platformType, ...other}) => (
    <Grid item xs={12} md={4}>
      <FormControl sx={{display: 'flex'}}>
        <FormLabel>{label}</FormLabel>
        <TextField
          size="small"
          style={{width: '80%'}}
          value={formik.values.networkConfigs[networkId][platformType][propertyName]}
          name={`networkConfigs[${networkId}].${platformType}.${propertyName}`}
          onChange={formik.handleChange}
          type={dataType}
          {...other}
        />
      </FormControl>
    </Grid>
  );

  const renderNetwork = () => {
    const type = formik.values.networkConfigs[networkId].type;
    let fields, typeName;
    switch (type) {
      default:
      case 0:
        fields = tcpFields;
        typeName = 'tcp';
        break;
      case 1:
        fields = aliyunFields;
        typeName = 'aliyun';
        break;
      case 2:
        fields = mqttFields;
        typeName = 'mqtt';
        break;
    }
    return (
      <>
        {fields.map(field => (
          <Fragment key={field.propertyName}>{renderTextField({...field, platformType: typeName})}</Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>网络通道ID</FormLabel>
            <RadioGroup
              row
              onChange={handleNetworkIdChange}
              value={networkId}
            >
              {
                networkIds.map(id => (
                  <FormControlLabel key={id} value={id} control={<Radio />} label={id+1} />
                ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <SwipeableViews index={networkId}>
        {
          formik.values.networkConfigs.map((networkConfig, index) => (
            <TabPanel key={index} index={index} value={networkId} sx={{px: 0, py: 3}}>
              <Grid
                container
                spacing={2}
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <FormControl sx={{display: 'flex'}}>
                    <FormLabel>启用状态</FormLabel>
                    <RadioGroup
                      row
                      value={formik.values.networkConfigs[networkId].enabled}
                      onChange={handleEnabledChange}
                      name={`networkConfigs[${index}].enabled`}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="启用" />
                      <FormControlLabel value={false} control={<Radio />} label="不启用" />
                    </RadioGroup>
                  </FormControl>     
                </Grid>
                {
                  formik.values.networkConfigs[index].enabled && (
                    <>
                      <Grid item xs={12} md={4}>
                        <FormControl sx={{display: 'flex'}}>
                          <FormLabel>平台类型</FormLabel>
                          <Select
                            size="small"
                            style={{width: '80%'}}
                            value={formik.values.networkConfigs[index].type}
                            name={`networkConfigs[${index}].type`}
                            onChange={formik.handleChange}
                          >
                            {
                              networkOptions.map(network => (
                                <MenuItem key={network.label} value={network.value}>
                                  {network.label}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>     
                      </Grid>
                    </>
                  )
                }
              </Grid>
              {
                formik.values.networkConfigs[index].enabled && (
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    style={{marginTop: '10px'}}
                  >
                    {renderNetwork()}
                    <Grid item xs={12} md={4}>
                      <FormControl sx={{display: 'flex'}}>
                        <FormLabel>串口ID</FormLabel>
                        <RadioGroup
                          row
                          value={formik.values.networkConfigs[networkId].serialId}
                          onChange={formik.handleChange}
                          name={`networkConfigs[${index}].serialId`}
                        >
                          <FormControlLabel value={0} control={<Radio />} label="1" />
                          <FormControlLabel value={1} control={<Radio />} label="2" />
                          <FormControlLabel value={2} control={<Radio />} label="3" />
                        </RadioGroup>
                      </FormControl>     
                    </Grid>
                  </Grid>
                )
              }
              
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  )
}

export default Platform;