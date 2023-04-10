import { useState, Fragment } from 'react';
import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../common/TabPanel';
import { renderFields } from './utils';
import {
  networkIds, networkOptions, aliyunFields, mqttFields, socketFields,
} from './constants';

function Platform({
  formik,
}) {
  const [networkId, setNetworkId] = useState(0);
  const handleNetworkIdChange = (event) => {
    setNetworkId(Number(event.target.value));
  };

  const handleEnabledChange = (e) => {
    formik.setFieldValue(`networkConfigs[${networkId}].enabled`, e.target.value === 'true');
  };

  const renderNetwork = () => {
    const { type } = formik.values.networkConfigs[networkId];
    let fields; let
      typeName;
    switch (type) {
      case 1:
        fields = aliyunFields;
        typeName = 'aliyun';
        break;
      case 2:
        fields = mqttFields;
        typeName = 'mqtt';
        break;
      case 0:
      default:
        fields = socketFields;
        typeName = 'socket';
        break;
    }
    return (
      <>
        {fields.map((field) => (
          <Fragment key={field.propertyName}>
            {renderFields({
              value: formik.values.networkConfigs[networkId][typeName][field.propertyName],
              name: `networkConfigs[${networkId}].${typeName}.${field.propertyName}`,
              handleChange: formik.handleChange,
              ...field,
            })}
          </Fragment>
        ))}
        {renderFields({
          label: '串口ID',
          value: Number(formik.values.networkConfigs[networkId].serialId),
          name: `networkConfigs[${networkId}].serialId`,
          handleChange: formik.handleChange,
          fieldType: 'radioGroup',
          radioOptions: [{ label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 }],
        })}
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
                networkIds.map((id) => (
                  <FormControlLabel key={id} value={id} control={<Radio />} label={id + 1} />
                ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <SwipeableViews index={networkId}>
        {
          formik.values.networkConfigs.map((networkConfig, index) => (
            <TabPanel key={index} index={index} value={networkId} sx={{ px: 0, py: 3 }}>
              <Grid
                container
                spacing={2}
                direction="row"
              >
                {
                  renderFields({
                    label: '启用状态',
                    value: formik.values.networkConfigs[networkId].enabled,
                    name: `networkConfigs[${index}].enabled`,
                    handleChange: handleEnabledChange,
                    fieldType: 'radioGroup',
                    radioOptions: [{ label: '启用', value: true }, { label: '不启用', value: false }],
                  })
                }
                {
                  formik.values.networkConfigs[index].enabled && (
                    <Grid item xs={12} md={4}>
                      <FormControl sx={{ display: 'flex' }}>
                        <FormLabel>平台类型</FormLabel>
                        <Select
                          size="small"
                          style={{ width: '80%' }}
                          value={formik.values.networkConfigs[index].type}
                          name={`networkConfigs[${index}].type`}
                          onChange={formik.handleChange}
                        >
                          {
                              networkOptions.map((network) => (
                                <MenuItem key={network.label} value={network.value}>
                                  {network.label}
                                </MenuItem>
                              ))
                            }
                        </Select>
                      </FormControl>
                    </Grid>
                  )
                }
              </Grid>
              {
                formik.values.networkConfigs[index].enabled && (
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    style={{ marginTop: '10px' }}
                  >
                    {renderNetwork()}
                  </Grid>
                )
              }

            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  );
}

export default Platform;
