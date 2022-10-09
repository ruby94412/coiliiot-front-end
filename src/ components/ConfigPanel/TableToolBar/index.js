import {
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {Button} from '@mui/material';

const TableToolBar = () => {
  return (
    <GridToolbarContainer>
      <Button>+添加分组</Button>
    </GridToolbarContainer>
  );
}

export default TableToolBar;
