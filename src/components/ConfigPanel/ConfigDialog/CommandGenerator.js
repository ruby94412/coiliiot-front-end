import { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/CommandGenerator';
import CommandDetail from './CommandDetail';
import { getCommand, renderFields, getUid } from './utils';
import { commandGeneratorFields } from './constants';

const dialogStyle = {
  backgroundColor: 'secondary.main',
  minWidth: '40%',
};

function CommandGenerator({
  rows,
  setRows,
  params,
  setParams,
  setRawCommandsField,
}) {
  const handleClose = () => setParams(null);
  const [data, setData] = useState(params);
  const [command, setCommand] = useState(null);

  useEffect(() => {
    setData(params);
  }, [params]);

  useEffect(() => {
    if (data) {
      setCommand(getCommand(data));
    }
  }, [data]);

  const handleDataChange = (propertyName, datatype) => (e) => {
    const updatedData = { ...data };
    if (datatype === 'number') {
      updatedData[propertyName] = Number(e.target.value);
    } else {
      updatedData[propertyName] = e.target.value;
    }
    setData(updatedData);
  };

  const handleConfirm = () => {
    let temp;
    if (params?.id) {
      temp = rows.map((obj) => (obj.id === data.id ? { ...data, detail: command } : obj));
      setRows(temp);
    } else {
      temp = [...rows];
      temp.push({ ...data, id: getUid(), detail: command });
      setRows(temp);
    }
    setRawCommandsField(temp);
    handleClose();
  };

  return (
    <Dialog
      open={!!params}
      onClose={handleClose}
      PaperProps={{ style: dialogStyle }}
    >
      <DialogTitle><FormattedMessage {...messages.title} /></DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          direction="row"
        >
          {data && commandGeneratorFields.map((field) => (
            <Fragment key={field.propertyName}>
              {renderFields({
                name: field.propertyName,
                value: data[field.propertyName],
                handleChange: handleDataChange(field.propertyName, field.datatype),
                layout: { xs: 12, md: 6 },
                ...field,
              })}
            </Fragment>
          ))}
        </Grid>
        {
          data && command
          && <Grid item xs={12} paddingTop={4}><CommandDetail command={command} /></Grid>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          <FormattedMessage {...messages.confirm} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommandGenerator;
