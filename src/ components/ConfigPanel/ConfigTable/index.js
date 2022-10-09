import { DataGrid } from '@mui/x-data-grid';
import TableToolBar from '../TableToolBar';

const columns = [
  { field: 'id', headerName: '序号', width: 70 },
  { field: 'group', headerName: '分组名称', width: 130 },
  {
    field: 'deviceCount',
    headerName: '设备数量',
    type: 'number',
    width: 90,
  },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.group || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', group: 'Jon', deviceCount: 35 },
  { id: 2, lastName: 'Lannister', group: 'Cersei', deviceCount: 42 },
  { id: 3, lastName: 'Lannister', group: 'Jaime', deviceCount: 45 },
  { id: 4, lastName: 'Stark', group: 'Arya', deviceCount: 16 },
  { id: 5, lastName: 'Targaryen', group: 'Daenerys', deviceCount: null },
  { id: 6, lastName: 'Melisandre', group: null, deviceCount: 150 },
  { id: 7, lastName: 'Clifford', group: 'Ferrara', deviceCount: 44 },
  { id: 8, lastName: 'Frances', group: 'Rossini', deviceCount: 36 },
  { id: 9, lastName: 'Roxie', group: 'Harvey', deviceCount: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '90%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pdeviceCountSize={5}
        components={{
          Toolbar: TableToolBar,
        }}
        rowsPerPdeviceCountOptions={[5]}
      />
    </div>
  );
}
