import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Box,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useState} from 'react';
import {useFormik} from 'formik';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../common/TabPanel';
import Platform from './Platform';
import Serial from './Serial';
import { initialValues } from './constants';

const dialogStyle = {
  backgroundColor: '#424141',
  color: 'white',
  minWidth: '70%',
}

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ConfigDialog = ({
  groupRow,
  onClose,
  updateConfig,
}) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: (values, {resetForm}) => {
      resetForm();
      const config = {serialConfigs:[], networkConfigs: [], networkSummary: {tcp: [], aliyun: [], mqtt:[]}};
      values.serialConfigs.forEach(ele => {
        if (ele.enabled) {
          config.serialConfigs.push(ele);
        }
      });
      values.networkConfigs.forEach(ele => {
        if (ele.enabled) {
          const {enabled, serialId, type, networkId} = ele;
          let detail;
          switch (type) {
            default:
            case 0:
              detail = ele.tcp;
              config.networkSummary.tcp.push(networkId);
              break;
            case 1:
              detail = ele.aliyun;
              config.networkSummary.aliyun.push(networkId);
              break;
            case 2:
              detail = ele.mqtt;
              config.networkSummary.mqtt.push(networkId);
              break;
          }
          config.networkConfigs.push({enabled, serialId, type, networkId, ...detail});
        }
      });
      config.config_version = new Date().toLocaleTimeString();
      handleSubmit(config);
    },
  });

  const handleSubmit = async config => {
    setSaveLoading(true);
    try {
      await updateConfig({
        ...groupRow,
        config: config,
      });
      setSnackbar({children: '数据已更新', severity: 'success'});
    } catch (error) {
      setSnackbar({children: "更新失败", severity: 'error'});
    }
    setSaveLoading(false);
  };

  const handleCloseSnackbar = () => {
    onClose();
    setSnackbar(null);
  };
  return (
    <Dialog
      maxWidth="xs"
      open={!!groupRow}
      onClose={onClose}
      PaperProps={{style: dialogStyle}}
    >
      <DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="基本参数" {...a11yProps(0)} />
            <Tab label="串口配置" {...a11yProps(1)} />
            <Tab label="网络配置" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </DialogTitle>
      <DialogContent>
        <SwipeableViews index={tabIndex}>
          <TabPanel value={tabIndex} index={0}>
              to do
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Serial formik={formik} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <Platform formik={formik} />
          </TabPanel>
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          取消
        </Button>
        <LoadingButton onClick={formik.handleSubmit} loading={saveLoading} variant="contained">
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