// Import of librairies or technical components
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instanceAxios from '../../axios/axiosInstance';

const actionLogout = createAsyncThunk('user/LOGOUT', async (_, thunkAPI) => {
  try {
    const response = await instanceAxios.post('/logout');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export default actionLogout;
