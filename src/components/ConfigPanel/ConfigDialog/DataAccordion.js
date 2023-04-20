import { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import { DataGrid } from '@mui/x-data-grid';
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
}) {
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [params, setParams] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(params);
  }, [params]);

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
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
    handleClose();
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    setParams({
      propertyName: '', address: 0, dataType: 1, ratio: 1,
    });
  };

  const handleFieldChange = (propertyName) => (e) => {
    const temp = { ...data };
    temp[propertyName] = e.target.value;
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
          <Grid item xs={12} md={6}><CommandDetail command={command.detail} /></Grid>
          <Grid item xs={12} md={6}>
            <DataGrid
              sx={{
                border: '1px dashed',
                borderColor: 'primary',
                height: '100%',
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
                    handleChange: handleFieldChange(field.propertyName),
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
