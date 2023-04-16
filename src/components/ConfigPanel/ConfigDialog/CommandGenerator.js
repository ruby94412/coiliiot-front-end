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
import { getCommand, renderFields } from './utils';
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

  const handleDataChange = (propertyName) => (e) => {
    const updatedData = { ...data };
    updatedData[propertyName] = e.target.value;
    setData(updatedData);
  };

  const handleConfirm = () => {
    let temp;
    if (params?.id) {
      temp = rows.map((obj) => (obj.id === data.id ? { ...data, detail: command } : obj));
      setRows(temp);
    } else {
      temp = [...rows];
      temp.push({ ...data, id: new Date().toString(), detail: command });
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
                handleChange: handleDataChange(field.propertyName),
                layout: { xs: 12, md: 6 },
                ...field,
              })}
            </Fragment>
          ))}
        </Grid>
        {data && command && <CommandDetail command={command} />}
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
