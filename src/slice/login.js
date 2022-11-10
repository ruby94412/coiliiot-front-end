import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import loginServices from '../services/loginServices';

const initialState = [];

export const login = createAsyncThunk(
  'login',
  async loginData => {
    const res = await loginServices.login(loginData);
    return res.data;
  }
);

const loginSlice = createSlice({
  name: 'loginInfo',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return {...action.payload.data};
      })
  }

});

const {reducer} = loginSlice;
export default reducer;