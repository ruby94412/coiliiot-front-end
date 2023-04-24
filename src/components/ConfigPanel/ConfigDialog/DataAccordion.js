import { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import StyledDataGrid from 'components/common/StyledDataGrid';
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataAccordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandDetail from './CommandDetail';
import {
  getMappingTableColumns, dataMappingFields,
} from './constants';
import { renderFields, getUid } from './utils';

const dialogStyle = {
  minWidth: '20%',
};

function DataAccordion({
  idx,
  expanded,
  handleExpandChange,
  command,
  setExpanded,
  setFields,
}) {
  const intl = useIntl();
  const [rows, setRows] = useState(command.initConversions || []);
  const [params, setParams] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(params);
  }, [params]);

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setFields({ conversions: temp, commandId: command.id });
  };

  const handleClose = () => setParams(null);

  const handleConfirm = () => {
    let temp;
    if (params?.id) {
      temp = rows.map((obj) => (obj.id === data.id ? { ...data } : obj));
      setRows(temp);
    } else {
      temp = [...rows];
      temp.push({ ...data, id: getUid() });
      setRows(temp);
      setExpanded(`command${idx}`);
    }
    setFields({ conversions: temp, commandId: command.id });
    handleClose();
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setParams({
      propertyName: '', address: 0, dataType: 0, ratio: 1, deviation: 0, order: 0,
    });
  };

  const handleFieldChange = (propertyName, datatype) => (e) => {
    const temp = { ...data };
    if (datatype === 'number') {
      temp[propertyName] = Number(e.target.value);
    } else {
      temp[propertyName] = e.target.value;
    }
    setData(temp);
  };

  const columns = getMappingTableColumns({ intl, setParams, deleteRow });
  return (
    <Accordion
      expanded={expanded === `command${idx}`}
      onChange={handleExpandChange(`command${idx}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: '20%', flexShrink: 0, lineHeight: 2.5 }}>
          {`Command ${idx + 1}`}
        </Typography>
        <Typography sx={{ width: '50%', fontFamily: 'Courier', lineHeight: 2.5 }}>{command.detail.hex.join(' ')}</Typography>
        <Button variant="outlined" onClick={handleAdd}>
          <FormattedMessage {...messages.addMappingButton} />
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          spacing={2}
          direction="row"
        >
          <Grid item xs={12} xl={6}><CommandDetail command={command.detail} /></Grid>
          <Grid item xs={12} xl={6}>
            <StyledDataGrid
              sx={{
                border: '1px dashed',
                borderColor: 'primary.main',
                height: '100%',
                minHeight: '180px',
              }}
              rows={rows}
              columns={columns}
              components={{
                NoRowsOverlay,
              }}
              hideFooterSelectedRowCount
              hideFooter
              hideFooterPagination
            />
          </Grid>
        </Grid>
      </AccordionDetails>
      <Dialog open={!!params} onClose={handleClose} PaperProps={{ style: dialogStyle }}>
        <DialogTitle><FormattedMessage {...messages.title} /></DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={2}
            direction="row"
          >
            {
              params && data && dataMappingFields.map((field) => (
                <Fragment key={field.propertyName}>
                  {renderFields({
                    handleChange: handleFieldChange(field.propertyName, field.datatype),
                    value: data[field.propertyName],
                    style: { width: '100%' },
                    layout: { xs: 12, md: 6 },
                    ...field,
                  })}
                </Fragment>
              ))
            }
          </Grid>
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
    </Accordion>
  );
}

export default DataAccordion;
