import {useState} from 'react';
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
import TabPanel from '../../common/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import {renderFields} from './utils';
import AutoPoll from './AutoPoll';
 
const Serial = ({
  formik,
}) => {
  const [serialId, setSerialId] = useState(0);
  const baudRateOptions = [1200, 2400, 4800, 9600, 14400,
    19200, 28800, 57600, 115200, 230400, 460800, 921600];
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
                      <Grid
                        item
                        xs={12}
                        md={4}
                      >
                        <FormControl fullWidth>
                          <FormLabel>波特率</FormLabel>
                          <Select
                            size="small"
                            style={{width: '80%'}}
                            value={formik.values.serialConfigs[serialId].baudrate}
                            name={`serialConfigs[${index}].baudrate`}
                            onChange={formik.handleChange}
                          >
                            {
                              baudRateOptions.map(baudrate => (
                                <MenuItem key={baudrate} value={baudrate}>{`${baudrate}bps`}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>     
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                      >
                        <FormControl sx={{display: 'flex'}}>
                          <FormLabel>数据位</FormLabel>
                          <RadioGroup
                            row
                            value={formik.values.serialConfigs[serialId].dataBit}
                            onChange={formik.handleChange}
                            name={`serialConfigs[${index}].dataBit`}
                          >
                            <FormControlLabel value={7} control={<Radio />} label="7" />
                            <FormControlLabel value={8} control={<Radio />} label="8" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={8}
                      >
                        <FormControl sx={{display: 'flex'}}>
                          <FormLabel>校验位</FormLabel>
                          <RadioGroup
                            row
                            value={formik.values.serialConfigs[serialId].parityMode}
                            onChange={formik.handleChange}
                            name={`serialConfigs[${index}].parityMode`}
                          >
                            <FormControlLabel value={0} control={<Radio />} label="UART.PAR_EVEN" />
                            <FormControlLabel value={1} control={<Radio />} label="UART.PAR_ODD" />
                            <FormControlLabel value={2} control={<Radio />} label="UART.PAR_NONE" />
                          </RadioGroup>
                        </FormControl>     
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                      >
                        <FormControl sx={{display: 'flex'}}>
                          <FormLabel>停止位</FormLabel>
                          <RadioGroup
                            row
                            value={formik.values.serialConfigs[serialId].stopBit}
                            onChange={formik.handleChange}
                            name={`serialConfigs[${index}].stopBit`}
                          >
                            <FormControlLabel value={1} control={<Radio />} label="1" />
                            <FormControlLabel value={2} control={<Radio />} label="2" />
                          </RadioGroup>
                        </FormControl>     
                      </Grid>
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