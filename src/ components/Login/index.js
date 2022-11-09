import {Grid, Button} from '@mui/material';
import {useState} from 'react';
import {useFormik} from 'formik';
import CssTextField from '../common/CssTextField';
import ErrorModal from '../common/ErrorModal';
import * as yup from 'yup';
import {connect} from 'react-redux';
import {login as loginRequest} from '../../slice/login';


const Login = ({
  setIsLoggedIn,
  setUserInfo,
  loginRequest,
}) => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
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
    loginRequest(values)
      .then(res => {
          console.log(res);
          const data = res?.payload;
          if (data.status === 'success') {
            setIsLoggedIn(true);
            setUserInfo(data?.data);
          } else {
            setIsErrorModalOpen(true);
          }
        })
    // axios.post(LOCALBACKEND, values)
    //   .then(res => {
    //     const data = res?.data;
    //     if (data.status === 'success') {
    //       setIsLoggedIn(true);
    //       setUserInfo(data?.data);
    //     } else {
    //       setIsErrorModalOpen(true);
    //     }
    //   })
  }
  return (
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <CssTextField
            required
            label="用户名"
            size="small"
            type="text"
            name="username"
            style={{width: '100%'}}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={8}>
          <CssTextField
            required
            label="密码"
            size="small"
            type="password"
            name="password"
            style={{width: '100%'}}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            onClick={formik.handleSubmit}
            style={{width: '100%', backgroundColor: 'rgb(78 70 212)', color: 'white'}}
          >
            登录
          </Button>
        </Grid>

        <ErrorModal
          errorMessage="请输入正确的用户名密码"
          isErrorModalOpen={isErrorModalOpen}
          onClose={() => {setIsErrorModalOpen(false);}}
        />
      </Grid>
  );
};


const mapStateToProps = state => {
  console.log(state);
  return {};
};
export default connect(mapStateToProps, {loginRequest})(Login);