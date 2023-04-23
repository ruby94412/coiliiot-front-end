import {
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
import { LoadingButton } from '@mui/lab';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useFormik, FastField } from 'formik';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/ConfigDialog/DialogContent';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'components/common/TabPanel';
import Platform from './Platform';
import Serial from './Serial';
import Basic from './Basic';
import AutoPoll from './AutoPoll';
import DataConversion from './DataConversion';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
  color: 'red',
});

const Content = forwardRef(({
  groupRow,
  onClose,
  updateConfig,
  initialValues,
}, ref) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDataConvert = (values) => {
    const config = {
      basicConfigs: {},
      serialConfigs: [],
      networkConfigs: [],
      networkSummary: { socket: [], aliyun: [], mqtt: [] },
    };
    config.basicConfigs = values.basicConfigs;
    values.serialConfigs.forEach((ele) => {
      if (ele.enabled) {
        const { autoPollEnabled, autoPollConfig, ...other } = ele;
        if (autoPollEnabled) {
          config.serialConfigs.push(ele);
        } else {
          config.serialConfigs.push({ autoPollEnabled, ...other });
        }
      }
    });
    let autoTaskCount = 0;
    values.networkConfigs.forEach((ele) => {
      if (ele.enabled) {
        const {
          enabled, serialId, type, networkId, conversionConfigs,
        } = ele;
        if (config.serialConfigs[serialId].autoPollEnabled) autoTaskCount++;
        const typeArr = ['socket', 'aliyun', 'mqtt'];
        const detail = ele[typeArr[type]];
        config.networkSummary[typeArr[type]].push(networkId);
        config.networkConfigs.push({
          enabled, serialId, type, networkId, conversionConfigs, ...detail,
        });
      }
    });
    config.config_version = new Date().toString();
    config.autoTaskCount = autoTaskCount;
    return config;
  };

  const handleSubmit = async (config) => {
    setSaveLoading(true);
    try {
      await updateConfig({
        ...groupRow,
        config,
      });
      setSnackbar({ children: <FormattedMessage {...messages.snackBarSuccess} />, severity: 'success' });
    } catch (error) {
      setSnackbar({ children: <FormattedMessage {...messages.snackBarError} />, severity: 'error' });
    }
    setSaveLoading(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const config = handleDataConvert(values);
      handleSubmit(config, resetForm);
    },
  });

  useImperativeHandle(ref, () => ({
    dirty: formik.dirty,
  }));

  const handleCloseSnackbar = () => {
    setSnackbar(null);
    onClose(false);
    formik.resetForm();
  };
  return (
    <>
      <DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs"
            variant="scrollable"
          >
            <Tab label={<FormattedMessage {...messages.basicTabLabel} />} {...a11yProps(0)} />
            <Tab label={<FormattedMessage {...messages.serialTabLabel} />} {...a11yProps(1)} />
            <Tab label={<FormattedMessage {...messages.networkTabLabel} />} {...a11yProps(2)} />
            <Tab label={<FormattedMessage {...messages.autoPollLabel} />} {...a11yProps(3)} />
            <Tab label={<FormattedMessage {...messages.dataConvertLabel} />} {...a11yProps(4)} />
          </Tabs>
        </Box>
      </DialogTitle>
      <DialogContent>
        <SwipeableViews index={tabIndex}>
          <TabPanel value={tabIndex} index={0}>
            <Basic formik={formik} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Serial formik={formik} />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <Platform formik={formik} />
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            <AutoPoll formik={formik} />
          </TabPanel>
          <TabPanel value={tabIndex} index={4}>
            <DataConversion formik={formik} />
          </TabPanel>
        </SwipeableViews>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(formik.dirty); }} variant="contained">
          <FormattedMessage {...messages.cancelButton} />
        </Button>
        <LoadingButton onClick={formik.handleSubmit} loading={saveLoading} variant="contained">
          <FormattedMessage {...messages.submitButton} />
        </LoadingButton>
      </DialogActions>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
});

export default Content;
