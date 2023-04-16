import {
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

function TableToolBar({
  setModalOpen,
  text,
  setParams,
}) {
  const handleAddClick = () => {
    if (setParams) setParams();
    else setModalOpen(true);
  };
  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        onClick={handleAddClick}
        color="primary"
      >
        {text}
      </Button>
    </GridToolbarContainer>
  );
}

export default TableToolBar;
