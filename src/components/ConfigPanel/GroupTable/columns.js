import DeleteIcon from '@mui/icons-material/Delete';
import DevicesIcon from '@mui/icons-material/Devices';
import SettingsIcon from '@mui/icons-material/Settings';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

const getColumns = ({
  setDeleteParams,
  setDeviceTableParams,
  setConfigParams,
}) => [
  {
    field: 'id', headerName: '分组序号', flex: 1, minWidth: 200,
  },
  { field: 'groupName', headerName: '分组名称', editable: true },
  {
    field: 'devices',
    headerName: '设备数量',
    type: 'number',
    width: 100,
    valueGetter: ({ value }) => value?.length || 0,
  },
  {
    field: 'updateTime',
    headerName: '更新时间',
    type: 'date',
    disableColumnMenu: true,
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'actions',
    headerName: '操作',
    type: 'actions',
    flex: 1,
    minWidth: 150,
    getActions: (params) => [
      <GridActionsCellItem
        icon={(
          <Tooltip title="管理分组设备">
            <DevicesIcon />
          </Tooltip>
        )}
        label="Devices"
        onClick={() => { setDeviceTableParams(params?.row); }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title="配置分组">
            <SettingsIcon />
          </Tooltip>
        )}
        label="Settings"
        onClick={() => { setConfigParams(params?.row); }}
      />,
      <GridActionsCellItem
        icon={(
          <Tooltip title="删除分组">
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
