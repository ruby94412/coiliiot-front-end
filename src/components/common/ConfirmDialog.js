import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/common/ConfirmDialog';

function ConfirmDialog({
  title,
  content,
  handleConfirmCb,
  isOpen,
  onClose,
}) {
  const handleConfirm = () => {
    handleConfirmCb();
    onClose();
  };
  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#424141',
          color: 'white',
          minWidth: '350px',
        },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          <FormattedMessage {...messages.cancelButton} />
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          <FormattedMessage {...messages.confirmButton} />
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
