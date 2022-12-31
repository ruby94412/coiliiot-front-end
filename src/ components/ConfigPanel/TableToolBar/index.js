import {
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {Button} from '@mui/material';

const TableToolBar = ({
  setModalOpen,
  text,
}) => {
  const handleAddClick = () => {
    setModalOpen(true);
  }
  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        onClick={handleAddClick}
      >{text}</Button>
    </GridToolbarContainer>
  );
}

export default TableToolBar;
