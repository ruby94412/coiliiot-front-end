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
        variant="outlined"
        style={{backgroundColor: 'rgb(78 70 212)', color: 'white'}}
        onClick={handleAddClick}
      >{text}</Button>
    </GridToolbarContainer>
  );
}

export default TableToolBar;
