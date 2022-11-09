import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slice/login';

const reducer = {
  login: loginReducer,
}
export default configureStore({
  reducer,
  devTools: true,
});
