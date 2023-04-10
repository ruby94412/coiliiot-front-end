import {
  TextField, Typography, Button, Grid, Dialog,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { addGroup } from '../../../slice/group';
import ErrorModal from '../../common/ErrorModal';

function AddGroup({
  addGroupOpen,
  setAddGroupOpen,
  addGroup,
  userInfo,
}) {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleClose = () => setAddGroupOpen(false);

  const validationSchema = yup.object({
    groupName: yup
      .string('请输入分组名称')
      .required('请输入分组名称'),
  });

  const handleSubmit = (values) => {
    addGroup({ groupName: values.groupName, username: userInfo.username })
      .then(() => {
        setAddGroupOpen(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      groupName: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  return (
    <Dialog
      open={addGroupOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      PaperProps={{
        style: {
          height: '200px',
          width: '30%',
          padding: '20px',
        },
      }}
    >
      <Typography variant="h6" component="h2" style={{ textAlign: 'center' }}>
        添加分组
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
          <TextField
            required
            label="分组名称"
            size="small"
            type="text"
            name="groupName"
            style={{ width: '100%' }}
            value={formik.values.groupName}
            onChange={formik.handleChange}
            error={formik.touched.groupName && Boolean(formik.errors.groupName)}
            helperText={formik.touched.groupName && formik.errors.groupName}
          />
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
        errorMessage="添加分组失败"
        isErrorModalOpen={isErrorModalOpen}
        onClose={() => { setIsErrorModalOpen(false); }}
      />
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};

export default connect(mapStateToProps, {
  addGroup,
})(AddGroup);
