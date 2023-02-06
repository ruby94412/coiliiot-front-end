import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import {GridActionsCellItem} from '@mui/x-data-grid';
import {Tooltip} from '@mui/material';

const getColumns = ({
  setDeleteParams,
}) => [
  { field: 'id', headerName: '设备序列号', flex: 1, minWidth: 200 },
  { field: 'deviceComment', headerName: '设备备注', editable: true},
  { field: 'deviceType', headerName: '设备类型'},
  {
    field: 'updateTime',
    headerName: '添加时间',
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
    getActions: params => [
      <GridActionsCellItem
        icon={
          <Tooltip title="连接设备">
            <SyncIcon style={{color: 'white'}}/>
          </Tooltip>
        }
        label="Sync"
      />,
      <GridActionsCellItem
        icon={
          <Tooltip title="删除设备">
            <DeleteIcon style={{color: 'white'}}/>
          </Tooltip>
        }
        label="Delete"
        onClick={()=> {setDeleteParams(params);}}
      />,
    ],
  },
];

export default getColumns;

