import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import loginService from '../services/loginServices';

const initialState = [];

export const login = createAsyncThunk(
  'login',
  async loginData => {
    const res = await loginService.login(loginData);
    return res.data;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(state, action)
        return [];
      })
  }

});

const {reducer} = loginSlice;
export default reducer;