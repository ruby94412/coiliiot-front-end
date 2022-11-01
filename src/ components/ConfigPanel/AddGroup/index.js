import {Box, Typography, Modal, Button, Grid} from '@mui/material';
import {useState, useContext} from 'react';
import {UserContext} from '../../../App';
import {useFormik} from 'formik';
import CssTextField from '../../common/CssTextField';
import ErrorModal from '../../common/ErrorModal';
import * as yup from 'yup';
import axios from 'axios';

const REQUESTURL = 'http://47.99.92.183:8080/group/add';
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

const AddGroup = ({
  addGroupOpen,
  setAddGroupOpen,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleClose = () => setAddGroupOpen(false);

  const user = useContext(UserContext);
  const validationSchema = yup.object({
    groupName: yup
      .string('请输入分组名称')
      .required('请输入分组名称'),
  })

  const formik = useFormik({
    initialValues: {
      groupName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      handleSubmit(values);
      resetForm();
    },
  })

  const handleSubmit = values => {
    axios.post(REQUESTURL, {groupName: values.groupName, username: user.username})
      .then(() => {
        setAddGroupOpen(false);
      })
  }
  return (
    <Modal
      open={addGroupOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" style={{color: 'white', textAlign:'center'}}>
          添加分组
        </Typography>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{height: '100%', paddingTop: '20px'}}
        >
          <Grid item xs={8} >
            <CssTextField
              required
              label="分组名称"
              size="small"
              type="text"
              name="groupName"
              style={{width: '100%'}}
              value={formik.values.groupName}
              onChange={formik.handleChange}
              error={formik.touched.groupName && Boolean(formik.errors.groupName)}
              helperText={formik.touched.groupName && formik.errors.groupName}
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
          errorMessage="添加分组失败"
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => {setIsErrorModalOpen(false);}}
        />
      </Box>
    </Modal>
  );
}

export default AddGroup;
