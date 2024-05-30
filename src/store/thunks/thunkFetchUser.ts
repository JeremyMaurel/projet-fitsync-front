// thunks/actionThunkFetchUser.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxiosLogged from '../../axios/axiosInstanceLogged';

const actionThunkFetchUser = createAsyncThunk(
  'user/FETCH_USER',
  async (_, thunkAPI) => {
    try {
      const response = await instanceAxiosLogged.get('/users');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export default actionThunkFetchUser;
