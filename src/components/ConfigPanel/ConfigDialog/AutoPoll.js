import { Fragment } from 'react';
import {
  Grid,
  Button,
} from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/AutoPoll';
import { renderFields } from './utils';

function AutoPoll({
  formik,
  index,
  serialId,
}) {
  const intl = useIntl();
  const handleAutoPollEnabledChange = (e) => {
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollEnabled`, e.target.value === 'true');
  };

  const handleCommandDelete = (cmdIdx) => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.splice(cmdIdx, 1);
    formik.setFieldValue(`serialConfigs[${index}].autoPollConfig.commands`, commandArr);
  };

  const handleCommandAdd = () => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.push('');
    formik.setFieldValue(`serialConfigs[${index}].autoPollConfig.commands`, commandArr);
  };

  return (
    <>
      {
        renderFields({
          label: intl.formatMessage(messages.autoPollLabel),
          value: formik.values.serialConfigs[serialId].autoPollEnabled,
          name: `serialConfigs[${index}].autoPollEnabled`,
          handleChange: handleAutoPollEnabledChange,
          fieldType: 'radioGroup',
          radioOptions: [
            { label: intl.formatMessage(messages.autoPollOptionEnable), value: true },
            { label: intl.formatMessage(messages.autoPollOptionDisable), value: false },
          ],
        })
      }
      {
        formik.values.serialConfigs[index].autoPollEnabled
          && (
            <>
              {renderFields({
                label: intl.formatMessage(messages.commandsIntervalLabel),
                fieldType: 'textField',
                datatype: 'number',
                name: `serialConfigs[${index}].autoPollConfig.delay`,
                value: formik.values.serialConfigs[serialId].autoPollConfig.delay,
                handleChange: formik.handleChange,
              })}
              {
                formik.values.serialConfigs[serialId].autoPollConfig.commands.map(
                  (command, cmdIdx) => (
                    <Fragment key={`cmd${cmdIdx}`}>
                      {renderFields({
                        label: `${intl.formatMessage(messages.commandLabel)} ${cmdIdx + 1}`,
                        style: { width: '90%' },
                        layout: { xs: 8 },
                        fieldType: 'textField',
                        datatype: 'text',
                        name: `serialConfigs[${index}].autoPollConfig.commands[${cmdIdx}]`,
                        value: command,
                        handleChange: formik.handleChange,
                        InputProps: {
                          endAdornment: <DeleteIcon
                            sx={{ '&:hover': { color: 'orangered' } }}
                            onClick={() => { handleCommandDelete(cmdIdx); }}
                          />,
                        },
                        helperText: cmdIdx === 0 && intl.formatMessage(messages.commandHelperText),
                      })}
                    </Fragment>
                  ),
                )
              }
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleCommandAdd}>{intl.formatMessage(messages.addCommandButton)}</Button>
              </Grid>
            </>
          )
      }
    </>
  );
}

export default AutoPoll;
