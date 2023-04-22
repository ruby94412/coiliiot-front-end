import {
  DataGrid,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#c2c2c2' : '#303030'
    }`,
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#c2c2c2' : '#303030'
    }`,
    color: theme.palette.primary.main,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#c2c2c2' : '#303030'
    }`,
    color: 'red',
  },
  '& .MuiDataGrid-cell': {
    color: theme.palette.primary.main,
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
    color: theme.palette.primary.main,
  },
}));

export default StyledDataGrid;
