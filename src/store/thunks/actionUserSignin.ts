/* eslint-disable @typescript-eslint/no-explicit-any */
// Import of libraries or technical components
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const actionUserSignin = createAsyncThunk(
  'user/SIGNIN',
  async (
    newUser: {
      mail?: string;
      pseudo?: string;
      password?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await instanceAxios.post('/signup', newUser);
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(
        'An error occurred while registering your user data. Please try again'
      );
    }
  }
);
export default actionUserSignin;
