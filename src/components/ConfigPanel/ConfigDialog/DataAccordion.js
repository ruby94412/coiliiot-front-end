import { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import StyledDataGrid from 'components/common/StyledDataGrid';
import {
  Badge,
  Box,
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
import {
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import NoRowsOverlay from 'components/common/NoRowsOverlay';
import CommandDetail from './CommandDetail';
import {
  getMappingTableColumns, dataMappingFields, getCustomTableColumns, customPropertyFields,
} from './constants';
import { renderFields, getUid } from './utils';

const dialogStyle = {
  minWidth: '20%',
};

export function DataAccordion({
  idx,
  expanded,
  handleExpandChange,
  command,
  setExpanded,
  setConversionFields,
}) {
  const intl = useIntl();
  const [rows, setRows] = useState([]);
  const [params, setParams] = useState(null);
  const [data, setData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setRows(command?.initConversions || []);
  }, [command]);

  useEffect(() => {
    setData(params);
  }, [params]);

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setConversionFields({ conversions: temp, commandId: command.id });
  };

  const handleClose = () => setParams(null);

  const handleShow = (e) => {
    e.stopPropagation();
    setShowDetail(true);
  };

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
    setConversionFields({
      conversions: temp,
      commandId: command.id,
      registerOffset: command.registerOffset,
    });
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
    <>
      <Accordion
        expanded={expanded === `command${idx}`}
        onChange={handleExpandChange(`command${idx}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ lineHeight: 2.5, width: '15%' }}>
            {`${intl.formatMessage(messages.commandText)} ${idx + 1}`}
          </Typography>
          <Typography sx={{ fontFamily: 'Courier', lineHeight: 2.5 }}>
            {command.detail.hex.join(' ')}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" onClick={handleAdd}>
            <FormattedMessage {...messages.addMappingButton} />
          </Button>
          <Button variant="outlined" onClick={handleShow} style={{ marginLeft: '20px' }}>
            <FormattedMessage {...messages.commandDetail} />
          </Button>
          <Badge badgeContent={Number(rows.length).toString()} color="error" style={{ margin: '10px' }}>
            <DescriptionIcon color="primary" />
          </Badge>
        </AccordionSummary>
        <AccordionDetails>
          <StyledDataGrid
            sx={{
              border: '1px dashed',
              borderColor: 'primary.main',
            }}
            autoHeight
            rows={rows}
            columns={columns}
            components={{
              NoRowsOverlay,
            }}
            hideFooterSelectedRowCount
            hideFooter
            hideFooterPagination
          />
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
        <Dialog
          open={showDetail}
          onClose={() => setShowDetail(false)}
        >
          <DialogContent dividers>
            <CommandDetail command={command.detail} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDetail(false)} variant="contained">
              <FormattedMessage {...messages.cancel} />
            </Button>
          </DialogActions>
        </Dialog>
      </Accordion>
    </>
  );
}

export function CustomPropsAccordion({
  expanded,
  handleExpandChange,
  setExpanded,
  initCustomProps,
  setCustomPropsFields,
}) {
  const intl = useIntl();
  const [params, setParams] = useState(null);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    setRows(initCustomProps);
  }, [initCustomProps]);

  const handleAdd = (e) => {
    e.stopPropagation();
    setParams({
      propertyKey: '', propertyValue: '', propertyType: 0,
    });
  };
  useEffect(() => {
    setData(params);
  }, [params]);

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
      setExpanded('customFields');
    }
    setCustomPropsFields(temp);
    handleClose();
  };

  const handleFieldChange = (propertyName, datatype) => (e) => {
    const temp = { ...data };
    if (propertyName === 'propertyType') temp.propertyValue = '';
    if (datatype === 'number') {
      temp[propertyName] = Number(e.target.value);
    } else {
      temp[propertyName] = e.target.value;
    }
    setData(temp);
  };

  const deleteRow = (row) => {
    const temp = [...rows];
    temp.splice(temp.findIndex((obj) => obj.id === row.id), 1);
    setRows(temp);
    setCustomPropsFields(temp);
  };

  const columns = getCustomTableColumns({ intl, setParams, deleteRow });
  return (
    <Accordion
      expanded={expanded === 'customFields'}
      onChange={handleExpandChange('customFields')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ lineHeight: 2.5 }}>
          <FormattedMessage {...messages.customPropetyTitle} />
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" onClick={handleAdd}>
          <FormattedMessage {...messages.addPropertyButton} />
        </Button>
        <Badge badgeContent={Number(rows.length).toString()} color="error" style={{ margin: '10px' }}>
          <DescriptionIcon color="primary" />
        </Badge>
      </AccordionSummary>
      <AccordionDetails>
        <StyledDataGrid
          sx={{
            border: '1px dashed',
            borderColor: 'primary.main',
          }}
          autoHeight
          rows={rows}
          columns={columns}
          components={{
            NoRowsOverlay,
          }}
          hideFooterSelectedRowCount
          hideFooter
          hideFooterPagination
        />
      </AccordionDetails>
      <Dialog open={!!params} onClose={handleClose} PaperProps={{ style: dialogStyle }}>
        <DialogContent dividers>
          {
            params && data && customPropertyFields.map((field) => (
              <Fragment key={field.propertyName}>
                {renderFields({
                  handleChange: handleFieldChange(field.propertyName, field.datatype),
                  value: data[field.propertyName],
                  style: { width: '100%' },
                  layout: { xs: 12 },
                  disabled: data.propertyType === 2 && field.propertyName === 'propertyValue',
                  ...field,
                })}
              </Fragment>
            ))
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
    </Accordion>
  );
}

export default DataAccordion;
