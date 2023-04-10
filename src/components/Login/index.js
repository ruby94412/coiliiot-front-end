import { Grid, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login as loginRequest } from 'slice/login';
import { FormattedMessage } from 'react-intl';
import messages from 'hocs/Locale/Messages/Login';
import ErrorModal from 'components/common/ErrorModal';
import './Login.css';

function Login({
  loginRequest,
}) {
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const validationSchema = yup.object({
    username: yup
      .string(<FormattedMessage {...messages.usernameErrorNotification} />)
      .required(<FormattedMessage {...messages.usernameErrorNotification} />),
    password: yup
      .string(<FormattedMessage {...messages.passwordErrorNotification} />)
      .required(<FormattedMessage {...messages.passwordErrorNotification} />),
  });

  const handleSubmit = (values) => {
    loginRequest(values).then((res) => {
      const data = res.payload;
      if (!data.isLoggedIn) {
        setIsErrorModalOpen(true);
        setErrMsg(data.message);
      } else {
        navigate('/mainPanel');
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="Login">
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xl={12}>
          <TextField
            required
            label={<FormattedMessage {...messages.usernameLabel} />}
            size="small"
            type="text"
            name="username"
            color="primary"
            style={{ width: '100%' }}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xl={12}>
          <TextField
            required
            label={<FormattedMessage {...messages.passwordLabel} />}
            size="small"
            type="password"
            name="password"
            color="primary"
            style={{ width: '100%' }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xl={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
            style={{ width: '100%' }}
          >
            <FormattedMessage {...messages.loginButtonLabel} />
          </Button>
        </Grid>

        <ErrorModal
          errorMessage={errMsg}
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => { setIsErrorModalOpen(false); }}
        />
      </Grid>
    </div>

  );
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps, { loginRequest })(Login);
