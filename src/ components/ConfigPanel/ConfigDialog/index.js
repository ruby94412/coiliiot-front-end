import {Dialog} from '@mui/material';
import DialogContent from './DialogContent';
const dialogStyle = {
  backgroundColor: '#424141',
  color: 'white',
  minWidth: '70%',
}

const ConfigDialog = ({
  groupRow,
  onClose,
  updateConfig,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={onClose}
      PaperProps={{style: dialogStyle}}
    >
      <DialogContent
        groupRow={groupRow}
        updateConfig={updateConfig}
        onClose={onClose}
      />
    </Dialog>
  );
}

export default ConfigDialog;