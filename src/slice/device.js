import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import deviceServices from '../services/deviceServices';

const initialState = [];

export const getDeviceList = createAsyncThunk(
  'device/getDeviceList',
  async data => {
    const res = await deviceServices.getDeviceList(data);
    return res.data;
  }
);

export const addDevice = createAsyncThunk(
  'device/addDevice',
  async data => {
    const res = await deviceServices.addDevice(data);
    return res.data;
  }
);

export const updateDevice = createAsyncThunk(
  'device/updateDevice',
  async data => {
    const res = await deviceServices.updateDevice(data);
    return res.data;
  }
);

export const deleteDevice = createAsyncThunk(
  'device/deleteDevice',
  async data => {
    const res = await deviceServices.deleteDevice(data);
    return res.data;
  }
);

const deviceSlice = createSlice({
  name: 'deviceInfo',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getDeviceList.fulfilled, (state, action) => {
        return [...action.payload.data];
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        return {...action.payload.data};
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        return {...action.payload.data};
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        return {...action.payload.data};
      })
  }

});

const {reducer} = deviceSlice;
export default reducer;