import {Grid, Button} from '@mui/material';
import {useState} from 'react';
import {useFormik} from 'formik';
import CssTextField from '../common/CssTextField';
import ErrorModal from '../common/ErrorModal';
import * as yup from 'yup';
import axios from 'axios';

const LOCALBACKEND = 'http://47.100.26.104:8080/login';


const Login = ({
  setIsLoggedIn,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const validationSchema = yup.object({
    username: yup
      .string('请输入密码')
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
    axios.post(LOCALBACKEND, values)
      .then(res => {
        const data = res?.data;
        if (data.status === 'success') {
          setIsLoggedIn(true);
        } else {
          setIsErrorModalOpen(true);
        }
      })
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CssTextField
            required
            label="用户名"
            size="small"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <CssTextField
            required
            label="密码"
            size="small"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={formik.handleSubmit} style={{width: '200px'}}>登录</Button>
        </Grid>
      </Grid>
      <ErrorModal
        errorMessage="请输入正确的用户名密码"
        isErrorModalOpen={isErrorModalOpen}
        onClose={() => {setIsErrorModalOpen(false);}}
      />
    </div>
  );
};

export default Login;