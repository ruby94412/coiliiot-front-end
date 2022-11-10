import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slice/login';
import groupReducer from './slice/group';

const reducer = {
  userInfo: loginReducer,
  groupInfo: groupReducer,
}
export default configureStore({
  reducer,
  devTools: true,
});
