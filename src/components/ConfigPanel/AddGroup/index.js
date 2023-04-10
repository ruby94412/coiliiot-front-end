import {
  TextField, Typography, Button, Grid, Dialog,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { addGroup } from 'slice/group';
import ErrorModal from 'components/common/ErrorModal';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/ConfigPanel/AddGroup';

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
      .string(<FormattedMessage {...messages.validateGroupName} />)
      .required(<FormattedMessage {...messages.validateGroupName} />),
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
        <FormattedMessage {...messages.addGroupTypography} />
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
            label={<FormattedMessage {...messages.groupNameLabel} />}
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
            <FormattedMessage {...messages.confirmButton} />
          </Button>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage={<FormattedMessage {...messages.addGroupError} />}
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
