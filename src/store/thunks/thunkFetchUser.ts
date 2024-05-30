// thunks/actionThunkFetchUser.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instanceAxiosLogged from '../../axios/axiosInstanceLogged';

const actionThunkFetchUser = createAsyncThunk(
  'user/FETCH_USER',
  async (_, thunkAPI) => {
    try {
      const response = await instanceAxiosLogged.get('/users');
      return response.data.data;
    } catch (error) {
      console.error('Login error:', error);

      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }

      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export default actionThunkFetchUser;
