/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const actionWeightUpdate = createAsyncThunk(
  'weight/UPDATE_WEIGHT',
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

const fetchWeight = createAsyncThunk('weight/FETCH_WEIGHT', async () => {
  try {
    const response = await instanceAxios.get('/weight');
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
});

export { actionWeightUpdate, fetchWeight };
