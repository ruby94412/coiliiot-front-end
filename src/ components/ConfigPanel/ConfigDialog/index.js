
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useState} from 'react';
import CssTextField from '../../common/CssTextField';
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
  const [config, setConfig] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const handleChange = e => {
    setConfig(e.target.value);
  }
  const handleSubmit = async () => {
    setSaveLoading(true);
    try {
      await updateConfig({
        ...groupRow,
        config: JSON.parse(config),
      });
      setSnackbar({children: '数据已更新', severity: 'success'});
    } catch (error) {
      setSnackbar({children: "更新失败", severity: 'error'});
    }
    setSaveLoading(false);
  }
  const handleCloseSnackbar = () => {
    onClose();
    setSnackbar(null);
  }
  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={onClose}
      PaperProps={{style: dialogStyle}}
    >
      <DialogTitle>配置设备</DialogTitle>
      <DialogContent dividers>
        <CssTextField
          label="输入配置JSON"
          multiline
          rows={10}
          onChange={handleChange}
          defaultValue={JSON.stringify(groupRow?.config)}
          style={{width: '100%'}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          取消
        </Button>
        <LoadingButton onClick={handleSubmit} loading={saveLoading}>
          保存配置
        </LoadingButton>
      </DialogActions>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Dialog>
  );
}

export default ConfigDialog;