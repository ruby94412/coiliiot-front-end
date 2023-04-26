import {
  useState, Fragment, useEffect, useRef, forwardRef, useImperativeHandle,
} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import TabPanel from 'components/common/TabPanel';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import SwipeableViews from 'react-swipeable-views';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/AutoPoll';
import TableToolBar from 'components/common/TableToolBar';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandGenerator from './CommandGenerator';
import { renderFields, convertRawCommands } from './utils';
import { autoPollFields, getCommandTableColumns } from './constants';

const AutoPoll = forwardRef(({
  initVals,
}, ref) => {
  const intl = useIntl();
  const [params, setParams] = useState(null);
  const [serialId, setSerialId] = useState(0);
  const [rows, setRows] = useState([]);
  const formikRefs = useRef([]);

  const serialIdOptions = [
    { label: '1', value: 0 }, { label: '2', value: 1 }, { label: '3', value: 2 },
  ];
  const enableOptions = [
    { label: intl.formatMessage(messages.autoPollOptionEnable), value: true },
    { label: intl.formatMessage(messages.autoPollOptionDisable), value: false },
  ];

  useEffect(() => {
    if (formikRefs.current[serialId].values.enabled) {
      setRows(convertRawCommands(formikRefs.current[serialId].values));
    } else {
      setRows([]);
    }
  }, [serialId]);

  const setCommandsField = (tempRows) => {
    const commands = tempRows.map((row) => ({
      dec: row.detail.dec,
      rawDec: row.detail.rawDec,
      period: row.period,
      id: row.id,
    }));
    formikRefs.current[serialId].setFieldValue('autoPollConfig.commands', commands);
  };

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setCommandsField(temp);
  };

  const handleSerialIdChange = (event) => {
    setSerialId(Number(event.target.value));
  };

  const handleEnabledChange = (index) => (e) => {
    formikRefs.current[index].setFieldValue('enabled', e.target.value === 'true');
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

  useImperativeHandle(ref, () => ({
    form: formikRefs,
  }));
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
      >
        {
          renderFields({
            label: intl.formatMessage(messages.serialIdLabel),
            value: serialId,
            handleChange: handleSerialIdChange,
            fieldType: 'radioGroup',
            radioOptions: serialIdOptions,
            layout: { xs: 12 },
          })
        }
      </Grid>
      <SwipeableViews index={serialId}>
        {
          initVals.map((serialConfig, index) => (
            <TabPanel key={index} index={index} value={serialId} sx={{ px: 0, py: 3 }}>
              <Formik
                innerRef={(el) => { formikRefs.current[index] = el; }}
                initialValues={serialConfig}
              >
                {(formikProps) => (
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                  >
                    {
                      renderFields({
                        label: intl.formatMessage(messages.autoPollLabel),
                        value: formikProps.values.enabled,
                        name: 'enabled',
                        handleChange: handleEnabledChange(index),
                        fieldType: 'radioGroup',
                        radioOptions: enableOptions,
                        layout: { xs: 12 },
                      })
                    }
                    {
                      formikProps.values.enabled
                        && (
                          <>
                            {
                              autoPollFields.map((field) => (
                                <Fragment key={field.propertyName}>
                                  {renderFields({
                                    value: formikProps.values[field.propertyName],
                                    name: `${field.propertyName}`,
                                    handleChange: formikProps.handleChange,
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
                                setCommandsField={setCommandsField}
                              />
                            </Grid>
                          </>
                        )
                    }
                  </Grid>
                )}
              </Formik>
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </>
  );
});

export default AutoPoll;
