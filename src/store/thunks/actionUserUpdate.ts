/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const fetchWeight = createAsyncThunk('user/FETCH_WEIGHT', async () => {
  try {
    const response = await instanceAxios.get('/weight');
    console.log('Weight data retrieved:', response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

const actionUserUpdate = createAsyncThunk(
  'user/UPDATE_USER',
  async (
    updatedUser: {
      pseudo?: string;
      mail?: string;
      height?: number;
      gender?: string;
      birthdate?: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await instanceAxios.patch('/users', updatedUser);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user data'
      );
    }
  }
);

const actionUserUpdateWeight = createAsyncThunk(
  'user/UPDATE_WEIGHT',
  async ({ weight, date }, thunkAPI) => {
    try {
      const response = await instanceAxios.post('/weight', {
        weight,
        date,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user weight'
      );
    }
  }
);

export { fetchWeight, actionUserUpdate, actionUserUpdateWeight };
