import {Box, Typography, Modal, Button, Grid, MenuItem} from '@mui/material';
import {useState} from 'react';
import {useFormik} from 'formik';
import CssTextField from '../../common/CssTextField';
import CssSelectField from '../../common/CssSelectField';
import ErrorModal from '../../common/ErrorModal';
import * as yup from 'yup';
import axios from 'axios';

const REQUESTURL = 'http://47.99.92.183:8080/device/add';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddDevice = ({
  addDeviceOpen,
  setAddDeviceOpen,
  groupId,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleClose = () => setAddDeviceOpen(false);

  const validationSchema = yup.object({
    deviceId: yup
      .string('请输入设备序列号')
      .required('请输入设备序列号'),
    deviceType: yup
    .string('请输入选择设备类型')
    .required('请输入选择设备类型'),
  })

  const formik = useFormik({
    initialValues: {
      deviceId: '',
      deviceType: '',
      deviceComment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      handleSubmit(values);
      resetForm();
    },
  })

  const handleSubmit = values => {
    axios.post(REQUESTURL, {groupId, ...values})
      .then(() => {
        setAddDeviceOpen(false);
      })
  }
  return (
    <Modal
      open={addDeviceOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" style={{color: 'white', textAlign:'center'}}>
          添加设备
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{height: '100%', paddingTop: '20px'}}
        >
          <Grid item xs={8}>
            <CssTextField
              required
              label="设备序列号"
              size="small"
              type="text"
              name="deviceId"
              style={{width: '100%'}}
              value={formik.values.deviceId}
              onChange={formik.handleChange}
              error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
              helperText={formik.touched.deviceId && formik.errors.deviceId}
            />
          </Grid>
          <Grid item xs={8}>
            <CssSelectField
              required
              label="设备备注"
              name="deviceType"
              size="small"
              style={{width: '100%'}}
              value={formik.values.deviceType}
              onChange={formik.handleChange}
              error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
            >
              <MenuItem value={'wifi'}>WIFI</MenuItem>
              <MenuItem value={'4G'}>4G</MenuItem>
            </CssSelectField>
          </Grid>
          <Grid item xs={8}>
            <CssTextField
              label="设备备注"
              size="small"
              type="text"
              name="deviceComment"
              style={{width: '100%'}}
              value={formik.values.deviceComment}
              onChange={formik.handleChange}
              error={formik.touched.deviceComment && Boolean(formik.errors.deviceComment)}
              helperText={formik.touched.deviceComment && formik.errors.deviceComment}
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="outlined"
              onClick={formik.handleSubmit}
              style={{width: '100%', backgroundColor: 'rgb(78 70 212)', color: 'white'}}
            >
              确认
            </Button>
          </Grid>
        </Grid>
        <ErrorModal
          errorMessage="添加设备失败"
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => {setIsErrorModalOpen(false);}}
        />
      </Box>
    </Modal>
  );
}

export default AddDevice;
