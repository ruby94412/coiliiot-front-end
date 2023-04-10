import DeleteIcon from '@mui/icons-material/Delete';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsIcon from '@mui/icons-material/Settings';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import messages from 'hocs/Locale/Messages/ConfigPanel/GroupTable/columns';

const getColumns = ({
  setDeleteParams,
  setDeviceTableParams,
  setConfigParams,
  intl,
}) => [
  {
    field: 'id', headerName: intl.formatMessage(messages.groupId), flex: 1, minWidth: 200,
  },
  {
    field: 'groupName',
    headerName: intl.formatMessage(messages.groupName),
    editable: true,
    minWidth: 200,
  },
  {
    field: 'devices',
    headerName: intl.formatMessage(messages.devices),
    type: 'number',
    width: 150,
    valueGetter: ({ value }) => value?.length || 0,
  },
  {
    field: 'updateTime',
    headerName: intl.formatMessage(messages.updatedTime),
    type: 'date',
    disableColumnMenu: true,
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'actions',
    headerName: intl.formatMessage(messages.actions),
    type: 'actions',
    flex: 1,
    minWidth: 150,
    getActions: (params) => [
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.manageGroupDeviceTooltip)}>
            <DevicesIcon />
          </Tooltip>
        )}
        label="Devices"
        onClick={() => { setDeviceTableParams(params?.row); }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.configGroupTooltip)}>
            <SettingsIcon />
          </Tooltip>
        )}
        label="Settings"
        onClick={() => { setConfigParams(params?.row); }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title={intl.formatMessage(messages.deleteGroupTooltip)}>
            <DeleteIcon />
          </Tooltip>
        )}
        label="Delete"
        onClick={() => { setDeleteParams(params); }}
      />,
    ],
  },
];

export default getColumns;
