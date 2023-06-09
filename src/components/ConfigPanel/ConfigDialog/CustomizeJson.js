/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-extra-boolean-cast */
import { useState, useEffect, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'components/common/StyledAccordion';
import { TreeView } from '@mui/lab';
import {
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  TextFields as TextIcon,
  Numbers as NumberIcon,
  CalendarMonth as DateIcon,
  DataObject as ObjectIcon,
  AttachMoney as MappingIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  StyledTreeItem,
  MinusSquare,
  PlusSquare,
  CloseSquare,
} from 'components/common/StyledTreeView';
import {
  IconButton,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DataAccordion';
import constMessages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/constants';
import { customPropertyFields } from './constants';
import { renderFields, getUid } from './utils';

const dialogStyle = {
  minWidth: '20%',
};

function TreeItemLabel({
  node,
  setParams,
  deleteNode,
}) {
  const {
    propertyType, propertyKey, propertyValue, id,
  } = node;
  const intl = useIntl();
  const icons = [TextIcon, NumberIcon, DateIcon, MappingIcon, ObjectIcon];
  const tooltips = ['string', 'number', 'date', 'mappingProperty', 'object'];
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldDisplay = isHovered || isFocused;
  const addCondition = propertyType === 4 && shouldDisplay;
  const onAdd = (e) => {
    e.stopPropagation();
    setParams({
      root: node,
    });
  };
  const onEdit = (e) => {
    e.stopPropagation();
    setParams({ node });
  };
  const onDelete = () => {
    deleteNode(id);
  };
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', height: '2.2rem',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Tooltip title={intl.formatMessage(constMessages[tooltips[propertyType]])}>
        <Box component={icons[propertyType]} color="inherit" sx={{ fontSize: '1.5rem', fontWeight: 1 }} />
      </Tooltip>
      <Tooltip title={intl.formatMessage(constMessages.propertyKey)}>
        <Typography sx={{ fontWeight: 'inherit', px: 1 }}>
          {`${propertyKey}${!!propertyValue ? ':' : ''}`}
        </Typography>
      </Tooltip>
      <Tooltip title={intl.formatMessage(constMessages.propertyValue)}>
        <Typography sx={{ fontWeight: 'inherit' }}>
          {propertyValue}
        </Typography>
      </Tooltip>
      <Box sx={{ flexGrow: 0.9 }} />
      {addCondition && (
        <Tooltip title={intl.formatMessage(constMessages.addTooltip)}>
          <IconButton size="small" color="inherit" onClick={onAdd}><AddIcon /></IconButton>
        </Tooltip>
      )}
      {node.id !== 'main' && shouldDisplay && (
        <>
          <Tooltip title={intl.formatMessage(constMessages.editTooltip)}>
            <IconButton size="small" color="inherit" onClick={onEdit}><EditIcon /></IconButton>
          </Tooltip>
          <Tooltip title={intl.formatMessage(constMessages.deleteTooltip)}>
            <IconButton size="small" color="inherit" onClick={onDelete}><DeleteIcon /></IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}

function CustomizeJson({
  expanded,
  handleExpandChange,
  initCustomizedJson,
  setCustomizedJsonField,
  mappingRows,
}) {
  const [params, setParams] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [rootNode, setRootNode] = useState(initCustomizedJson);
  const [fields, setFields] = useState(customPropertyFields);
  const [mappingOptions, setMappingOptions] = useState([]);
  useEffect(() => {
    setRootNode(!!initCustomizedJson
      ? JSON.parse(JSON.stringify(initCustomizedJson))
      : {
        propertyKey: '',
        id: 'main',
        propertyType: 4,
        children: [],
      });
  }, [initCustomizedJson]);

  useEffect(() => {
    setPropertyData(
      params?.root
        ? { propertyKey: '', propertyValue: '', propertyType: 0 }
        : params?.node,
    );
  }, [params]);

  useEffect(() => {
    setMappingOptions(
      mappingRows.map((row) => ({ label: row.propertyName, value: `${row.propertyName}_VALUE` })),
    );
  }, [mappingRows]);

  useEffect(() => {
    if (!!propertyData) {
      const { propertyType } = propertyData;
      const tempFields = [...fields];
      let keyField = tempFields.pop();
      if (propertyType === 3) {
        keyField = {
          ...keyField,
          fieldType: 'select',
          selectOptions: mappingOptions,
        };
      } else {
        const { label, propertyName } = keyField;
        keyField = { label, propertyName };
      }
      tempFields.push(keyField);
      setFields(tempFields);
    }
  }, [propertyData]);

  const handleClose = () => setParams(null);

  const handleConfirm = () => {
    if (params?.root) {
      const child = { ...propertyData, id: getUid() };
      if (child.propertyType > 2) child.children = [];
      params.root.children.push(child);
    } else {
      Object.assign(params.node, propertyData);
      if (params.node.propertyType > 2 && !params.node.children) params.node.children = [];
    }
    const temp = { ...rootNode };
    setRootNode(temp);
    setCustomizedJsonField(temp);
    handleClose();
  };

  const handleFieldChange = (field) => (e) => {
    const { propertyName, datatype, fieldType } = field;
    const temp = { ...propertyData };
    switch (propertyName) {
      case 'propertyType':
        temp.propertyValue = '';
        temp.propertyKey = '';
        if (Number(e.target.value) === 2) temp.propertyValue = 'DATE_VALUE';
        break;
      case 'propertyKey':
        if (fieldType === 'select') temp.propertyValue = `${e.target.value?.toUpperCase()}_VALUE`;
        break;
      default:
        break;
    }
    if (datatype === 'number') {
      temp[propertyName] = Number(e.target.value);
    } else {
      temp[propertyName] = e.target.value;
    }
    setPropertyData(temp);
  };

  const deleteNode = (id, node) => {
    if (!node) deleteNode(id, rootNode);
    if (node?.children?.length) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].id === id) {
          node.children.splice(i, 1);
          const temp = { ...rootNode };
          setRootNode(temp);
          return;
        }
        deleteNode(id, node.children[i]);
      }
    }
  };

  const renderTreeView = (node) => {
    if (!node) return (<></>);
    const {
      propertyType, children, id,
    } = node;
    const actionProps = { setParams, deleteNode };
    if (propertyType < 3) {
      return (
        <StyledTreeItem
          key={id}
          nodeId={id}
          label={<TreeItemLabel node={node} {...actionProps} />}
        />
      );
    }
    return (
      <StyledTreeItem
        key={id}
        nodeId={id}
        label={<TreeItemLabel node={node} {...actionProps} />}
      >
        {
          children?.map((child) => renderTreeView(child))
        }
      </StyledTreeItem>
    );
  };

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
          <FormattedMessage {...messages.customizeJsonTitle} />
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </AccordionSummary>
      <AccordionDetails>
        <TreeView
          aria-label="customized"
          defaultExpanded={['main']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          sx={{ maxWidth: '60%' }}
        >
          {renderTreeView(rootNode)}
        </TreeView>
      </AccordionDetails>
      <Dialog open={!!params} onClose={handleClose} PaperProps={{ style: dialogStyle }}>
        <DialogContent dividers>
          {
            params && propertyData && fields.map((field) => (
              <Fragment key={field.propertyName}>
                {renderFields({
                  handleChange: handleFieldChange(field),
                  value: propertyData[field.propertyName],
                  style: { width: '100%' },
                  layout: { xs: 12 },
                  disabled: propertyData.propertyType > 1 && field.propertyName === 'propertyValue',
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
