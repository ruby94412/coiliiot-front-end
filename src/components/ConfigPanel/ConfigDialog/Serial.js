import {useState, Fragment} from 'react';
import {
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import TabPanel from '../../common/TabPanel';
import AutoPoll from './AutoPoll';
import SwipeableViews from 'react-swipeable-views';
import {serialFields} from './constants';
import {renderFields} from './utils';

const Serial = ({
  formik,
}) => {
  const [serialId, setSerialId] = useState(0);
  const handleSerialIdChange = event => {
    setSerialId(Number(event.target.value));
  };

  const handleEnabledChange = e => {
    formik.setFieldValue(`serialConfigs[${serialId}].enabled`, e.target.value === 'true');
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
            <FormLabel>串口ID</FormLabel>
            <RadioGroup
              row
              onChange={handleSerialIdChange}
              value={serialId}
            >
              <FormControlLabel value={0} control={<Radio />} label="1" />
              <FormControlLabel value={1} control={<Radio />} label="2" />
              <FormControlLabel value={2} control={<Radio />} label="3" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <SwipeableViews index={serialId}>
        {
          formik.values.serialConfigs.map((serialConfig, index) => (
            <TabPanel key={index} index={index} value={serialId} sx={{px: 0, py: 3}}>
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
                      value={formik.values.serialConfigs[serialId].enabled}
                      onChange={handleEnabledChange}
                      name={`serialConfigs[${index}].enabled`}
                      
                    >
                      <FormControlLabel value={true} control={<Radio />} label="启用" />
                      <FormControlLabel value={false} control={<Radio />} label="不启用" />
                    </RadioGroup>
                  </FormControl>     
                </Grid>
                {
                  formik.values.serialConfigs[index].enabled
                    && <>
                      {serialFields.map(field => (
                        <Fragment key={field.propertyName}>
                          {renderFields({
                            value: formik.values.serialConfigs[serialId][field.propertyName],
                            name: `serialConfigs[${index}].${field.propertyName}`,
                            handleChange: formik.handleChange,
                            ...field,
                          })}
                        </Fragment>
                      ))}
                      <AutoPoll formik={formik} index={index} serialId={serialId}/>
                    </>
                }
              </Grid>             
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  )
}

export default Serial;