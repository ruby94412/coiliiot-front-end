import { Fragment, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import {
  DeleteForever as DeleteIcon,
} from '@mui/icons-material';
import TabPanel from 'components/common/TabPanel';
import { useIntl } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/AutoPoll';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandGenerator from './CommandGenerator';
import { renderFields, convertRawCommands } from './utils';
import { autoPollFields, getCommandTableColumns } from './constants';

function AutoPoll({
  formik,
}) {
  const intl = useIntl();
  const [params, setParams] = useState(null);
  const [serialId, setSerialId] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (formik.values.serialConfigs[serialId].autoPollConfig) {
      setRows(convertRawCommands(formik.values.serialConfigs[serialId].autoPollConfig));
    } else {
      setRows([]);
    }
  }, [serialId]);

  const setRawCommandsField = (tempRows) => {
    const rawCommands = tempRows.map((row) => ({
      dec: row.detail.dec,
      rawDec: row.detail.rawDec,
      period: row.period,
    }));
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollConfig.rawCommands`, rawCommands);
  };

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setRawCommandsField(temp);
  };

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleAutoPollEnabledChange = (e) => {
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollEnabled`, e.target.value === 'true');
  };

  const handleCommandDelete = (cmdIdx) => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.splice(cmdIdx, 1);
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollConfig.commands`, commandArr);
  };

  const handleCommandAdd = () => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.push('');
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollConfig.commands`, commandArr);
  };

  const columns = getCommandTableColumns({ intl, setParams, deleteRow });
  const renderToolBar = () => (
    <TableToolBar
      setModalOpen={() => {
        setParams({
          period: 0, slaveId: 1, functionCode: 1, registerOffset: 0, numberOfRegisters: 1,
        });
      }}
      text={intl.formatMessage(messages.commandGeneratorButton)}
    />
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>{intl.formatMessage(messages.serialIdLabel)}</FormLabel>
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
            <TabPanel key={index} index={index} value={serialId} sx={{ px: 0, py: 3 }}>
              <Grid
                container
                spacing={2}
                direction="row"
              >
                {
                  renderFields({
                    label: intl.formatMessage(messages.autoPollLabel),
                    value: formik.values.serialConfigs[serialId].autoPollEnabled,
                    name: `serialConfigs[${serialId}].autoPollEnabled`,
                    handleChange: handleAutoPollEnabledChange,
                    fieldType: 'radioGroup',
                    radioOptions: [
                      { label: intl.formatMessage(messages.autoPollOptionEnable), value: true },
                      { label: intl.formatMessage(messages.autoPollOptionDisable), value: false },
                    ],
                    layout: { xs: 12 },
                  })
                }
                {
                  formik.values.serialConfigs[serialId].autoPollEnabled
                    && (
                      <>
                        {
                          autoPollFields.map((field) => (
                            <Fragment key={field.propertyName}>
                              {renderFields({
                                value: formik.values.serialConfigs[serialId]
                                  .autoPollConfig[field.propertyName],
                                name: `serialConfigs[${serialId}].autoPollConfig.${field.propertyName}`,
                                handleChange: formik.handleChange,
                                layout: { xs: 12, md: 4 },
                                ...field,
                              })}
                            </Fragment>
                          ))
                        }
                        <Grid item xs={12}>
                          <DataGrid
                            sx={{
                              boxShadow: 2,
                              border: 2,
                              borderColor: 'primary.dark',
                              height: '300px',
                            }}
                            rows={rows}
                            columns={columns}
                            components={{
                              Toolbar: renderToolBar,
                              NoRowsOverlay,
                            }}
                            hideFooterSelectedRowCount
                            hideFooter
                            hideFooterPagination
                          />
                          <CommandGenerator
                            rows={rows}
                            setRows={setRows}
                            params={params}
                            setParams={setParams}
                            setRawCommandsField={setRawCommandsField}
                          />
                        </Grid>
                        {
                          formik.values.serialConfigs[serialId].autoPollConfig.commands.map(
                            (command, cmdIdx) => (
                              <Fragment key={`cmd${cmdIdx}`}>
                                {renderFields({
                                  label: `${intl.formatMessage(messages.commandLabel)} ${cmdIdx + 1}`,
                                  style: { width: '90%' },
                                  layout: { xs: 12, md: 8 },
                                  fieldType: 'textField',
                                  datatype: 'text',
                                  name: `serialConfigs[${serialId}].autoPollConfig.commands[${cmdIdx}]`,
                                  value: command,
                                  handleChange: formik.handleChange,
                                  InputProps: {
                                    endAdornment: <DeleteIcon
                                      sx={{ '&:hover': { color: 'orangered' } }}
                                      onClick={() => { handleCommandDelete(cmdIdx); }}
                                    />,
                                  },
                                  helperText: cmdIdx === 0
                                    && intl.formatMessage(messages.commandHelperText),
                                })}
                              </Fragment>
                            ),
                          )
                        }
                        <Grid item xs={12}>
                          <Button variant="contained" onClick={handleCommandAdd}>
                            {intl.formatMessage(messages.commandGeneratorButton)}
                          </Button>
                        </Grid>
                      </>
                    )
                }
              </Grid>
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  );
}

export default AutoPoll;
