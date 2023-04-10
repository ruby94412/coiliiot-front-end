import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import groupServices from 'services/groupServices';

const initialState = [];

export const getGroupList = createAsyncThunk(
  'group/getGroupList',
  async (data) => {
    const res = await groupServices.getGroupList(data);
    return res.data;
  },
);

export const addGroup = createAsyncThunk(
  'group/addGroup',
  async (data) => {
    const res = await groupServices.addGroup(data);
    return res.data;
  },
);

export const updateGroup = createAsyncThunk(
  'group/updateGroup',
  async (data) => {
    const res = await groupServices.updateGroup(data);
    return res.data;
  },
);

export const deleteGroup = createAsyncThunk(
  'group/deleteGroup',
  async (data) => {
    const res = await groupServices.deleteGroup(data);
    return res.data;
  },
);

const groupSlice = createSlice({
  name: 'groupInfo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGroupList.fulfilled, (state, action) => ({ ...action.payload.data || [] }))
      .addCase(addGroup.fulfilled, (state, action) => ({ ...action.payload.data }))
      .addCase(updateGroup.fulfilled, (state, action) => ({ ...action.payload.data }))
      .addCase(deleteGroup.fulfilled, (state, action) => ({ ...action.payload.data }));
  },

});

const { reducer } = groupSlice;
export default reducer;
