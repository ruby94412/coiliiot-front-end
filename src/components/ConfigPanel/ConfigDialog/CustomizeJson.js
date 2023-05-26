import { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import {
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  TextFields as TextIcon,
  Numbers as NumberIcon,
  CalendarMonth as DateIcon,
  DataObject as ObjectIcon,
  DataArray as ArrayIcon,
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import {
  StyledTreeItem,
  MinusSquare,
  PlusSquare,
  CloseSquare,
} from 'components/common/StyledTreeView';
import {
  Badge,
  Box,
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
  getCustomTableColumns, customPropertyFields,
} from './constants';
import { renderFields, getUid } from './utils';

const dialogStyle = {
  minWidth: '20%',
};

function TreeItemLabel({
  propertyType,
  propertyValue,
  propertyKey,
}) {
  const icons = [TextIcon, NumberIcon, DateIcon, ObjectIcon, ArrayIcon];
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldDisplay = isHovered || isFocused;
  const addCondition = (propertyType === 3 || propertyType === 4) && shouldDisplay;
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Box component={icons[propertyType]} color="inherit" sx={{ mr: 1, fontSize: '1rem' }} />
      <Typography sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
        {propertyKey}
      </Typography>
      {addCondition && <Box component={AddIcon} color="inherit" sx={{ mr: 1, fontSize: '1.2rem' }} />}
      {shouldDisplay && (
        <>
          <Box component={EditIcon} color="inherit" sx={{ mr: 1, fontSize: '1.2rem' }} />
          <Box component={DeleteIcon} color="inherit" sx={{ mr: 1, fontSize: '1.2rem' }} />
        </>
      )}
    </Box>
  );
}

function CustomizeJson({
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
        {/* <StyledDataGrid
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
        /> */}
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

export default CustomizeJson;
