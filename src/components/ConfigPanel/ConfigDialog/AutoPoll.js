import {Fragment} from 'react';
import {
  Grid,
  Button,
} from '@mui/material';
import {DeleteForever as DeleteIcon} from '@mui/icons-material';
import {renderFields} from './utils';

const AutoPoll = ({
  formik,
  index,
  serialId,
}) => {
  const handleAutoPollEnabledChange = e => {
    formik.setFieldValue(`serialConfigs[${serialId}].autoPollEnabled`, e.target.value === 'true');
  };

  const handleCommandDelete = (cmdIdx) => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.splice(cmdIdx, 1);
    formik.setFieldValue(`serialConfigs[${index}].autoPollConfig.commands`, commandArr);
  }
  
  const handleCommandAdd = () => {
    const commandArr = Array.from(formik.values.serialConfigs[serialId].autoPollConfig.commands);
    commandArr.push('');
    formik.setFieldValue(`serialConfigs[${index}].autoPollConfig.commands`, commandArr);
  }

  return (
    <>
      {
        renderFields({
          label: '自定义轮训',
          value: formik.values.serialConfigs[serialId].autoPollEnabled,
          name: `serialConfigs[${index}].autoPollEnabled`,
          handleChange: handleAutoPollEnabledChange,
          fieldType: 'radioGroup',
          radioOptions: [{label: '启用', value: true}, {label: '不启用', value: false}],
        })
      }
      {
        formik.values.serialConfigs[index].autoPollEnabled
          && 
          (
            <>
              {renderFields({
                label: '命令间隔时间',
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
                        label: `命令${cmdIdx+1}`,
                        style: {width: '90%'},
                        layout: {xs: 8},
                        fieldType: 'textField',
                        datatype: 'text',
                        name: `serialConfigs[${index}].autoPollConfig.commands[${cmdIdx}]`,
                        value: command,
                        handleChange: formik.handleChange,
                        InputProps:{
                          endAdornment: <DeleteIcon
                              sx={{"&:hover": {color: "orangered"}}}
                              onClick={() => {handleCommandDelete(cmdIdx);}}
                            />
                        },
                        helperText: cmdIdx === 0 && "示例: 01 04 00 00 00 01 31 CA",
                      })}
                    </Fragment>
                  )
                )
              }
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleCommandAdd}>添加命令</Button>
              </Grid>
            </>
          )
      }
    </>
  );
}

export default AutoPoll;