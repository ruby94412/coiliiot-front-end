import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginServices from 'services/loginServices';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const initialState = userInfo
  ? { ...userInfo, isLoggedIn: true }
  : { isLoggedIn: false };

export const login = createAsyncThunk(
  'login',
  async (loginData) => {
    let res = null;
    try {
      res = await loginServices.login(loginData);
      res.data.isLoggedIn = true;
      localStorage.setItem('userInfo', JSON.stringify(res.data));
    } catch (err) {
      res = err.response;
      res.data.isLoggedIn = false;
    }
    return res?.data;
  },
);

export const logout = createAsyncThunk(
  'logout',
  async () => {},
);

export const refreshToken = createAsyncThunk(
  'refreshToken',
  async (refreshData) => refreshData,
);

const loginSlice = createSlice({
  name: 'loginInfo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => ({ ...action.payload }))
      .addCase(logout.fulfilled, () => ({}))
      .addCase(
        refreshToken.fulfilled,
        (state, action) => ({ ...state, accessToken: action.payload }),
      );
  },
});

const { reducer } = loginSlice;
export default reducer;
