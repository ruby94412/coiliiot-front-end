import {Grid, Button, TextField} from '@mui/material';
import {useState} from 'react';
import {useFormik} from 'formik';
import {connect} from 'react-redux';
import {login as loginRequest} from '../../slice/login';
import {useNavigate} from 'react-router-dom';
import ErrorModal from '../common/ErrorModal';
import * as yup from 'yup';
import './Login.css'


const Login = ({
  loginRequest,
}) => {
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const validationSchema = yup.object({
    username: yup
      .string('请输入用户名')
      .required('请输入用户名'),
    password: yup
      .string('请输入密码')
      .required('请输入密码'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      handleSubmit(values);
    }
  })
  const handleSubmit = values => {
    loginRequest(values).then(res => {
      const data = res.payload;
      if (!data.isLoggedIn) {
        setIsErrorModalOpen(true);
        setErrMsg(data.message);
      } else {
        navigate('/mainPanel');
      }
    });
  }
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
            label="用户名"
            size="small"
            type="text"
            name="username"
            color="primary"
            style={{width: '100%'}}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xl={12}>
          <TextField
            required
            label="密码"
            size="small"
            type="password"
            name="password"
            color="primary"
            style={{width: '100%'}}
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
            style={{width: '100%'}}
          >
            登录
          </Button>
        </Grid>

        <ErrorModal
          errorMessage={errMsg}
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => {setIsErrorModalOpen(false);}}
        />
      </Grid>
    </div>
      
  );
};


const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, {loginRequest})(Login);