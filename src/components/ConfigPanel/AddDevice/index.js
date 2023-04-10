import * as yup from 'yup';
import {
  Dialog,
  Typography,
  Button,
  Grid,
  MenuItem,
  TextField,
  Select,
  FormLabel,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { addDevice } from '../../../slice/device';
// import CssTextField from '../../common/CssTextField';
// import CssSelectField from '../../common/CssSelectField';
import ErrorModal from '../../common/ErrorModal';

function AddDevice({
  addDeviceOpen,
  setAddDeviceOpen,
  groupId,
  addDevice,
}) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleClose = () => setAddDeviceOpen(false);

  const validationSchema = yup.object({
    deviceId: yup
      .string('请输入设备序列号')
      .required('请输入设备序列号'),
    deviceType: yup
      .string('请输入选择设备类型')
      .required('请输入选择设备类型'),
  });

  const handleSubmit = (values) => {
    addDevice({ groupId, ...values })
      .then(() => {
        setAddDeviceOpen(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      deviceId: '',
      deviceType: '',
      deviceComment: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  return (
    <Dialog
      open={addDeviceOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      PaperProps={
        {
          style: {
            height: '350px',
            width: '30%',
            padding: '20px',
          },
        }
      }
    >
      <Typography variant="h6" component="h2" style={{ textAlign: 'center' }}>
        添加设备
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100%', paddingTop: '20px' }}
      >
        <Grid item xs={8}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>设备序列号</FormLabel>
            <TextField
              required
              size="small"
              type="text"
              name="deviceId"
              style={{ width: '100%' }}
              value={formik.values.deviceId}
              onChange={formik.handleChange}
              error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
              helperText={formik.touched.deviceId && formik.errors.deviceId}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>设备类型</FormLabel>
            <Select
              size="small"
              style={{ width: '100%' }}
              value={formik.values.deviceType}
              onChange={formik.handleChange}
              error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
            >
              <MenuItem value="wifi">WIFI</MenuItem>
              <MenuItem value="4G">4G</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>设备备注</FormLabel>
            <TextField
              size="small"
              type="text"
              name="deviceComment"
              style={{ width: '100%' }}
              value={formik.values.deviceComment}
              onChange={formik.handleChange}
              error={formik.touched.deviceComment && Boolean(formik.errors.deviceComment)}
              helperText={formik.touched.deviceComment && formik.errors.deviceComment}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ width: '100%' }}
          >
            确认
          </Button>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage="添加设备失败"
        isErrorModalOpen={isErrorModalOpen}
        onClose={() => { setIsErrorModalOpen(false); }}
      />
    </Dialog>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  addDevice,
})(AddDevice);
