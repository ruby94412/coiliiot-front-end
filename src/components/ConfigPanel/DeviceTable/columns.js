import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/DeviceTable/column';

const getColumns = ({
  setDeleteParams,
  intl,
}) => [
  {
    field: 'id', headerName: intl.formatMessage(messages.deviceId), flex: 1, minWidth: 200,
  },
  {
    field: 'deviceComment', headerName: intl.formatMessage(messages.deviceComment), editable: true, minWidth: 150,
  },
  { field: 'deviceType', headerName: intl.formatMessage(messages.deviceType) },
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
          <Tooltip title={<FormattedMessage {...messages.connectDeviceTooltip} />}>
            <SyncIcon />
          </Tooltip>
        )}
        label="Sync"
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title={<FormattedMessage {...messages.deleteDeviceTooltip} />}>
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
