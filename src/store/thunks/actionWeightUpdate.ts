/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const actionWeightUpdate = createAsyncThunk(
  'weight/UPDATE_WEIGHT',
  async (
    { weight, date }: { weight: number; date: string | Date },
    thunkAPI
  ) => {
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
    const data = response.data.data;

    if (data.length <= 1) {
      return null;
    }
    data.sort(
      (
        a: { date: string | number | Date },
        b: { date: string | number | Date }
      ) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return data[0];
  } catch (error) {
    throw error;
  }
});

const fetchGraphicWeight = createAsyncThunk(
  'weight/FETCH_GRAPHIC_WEIGHT',
  async () => {
    try {
      const response = await instanceAxios.get('/weight');
      const data = response.data.data;

      const formattedData = data
        .map((entry: { value: string; date: string | number | Date }) => ({
          weight: parseFloat(entry.value),
          date: new Date(entry.date).toISOString().split('T')[0],
        }))
        .slice(1)
        .sort(
          (
            a: { date: string | number | Date },
            b: { date: string | number | Date }
          ) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      return formattedData;
    } catch (error) {
      throw error;
    }
  }
);

const fetchAllWeights = createAsyncThunk(
  'weight/FETCH_ALL_WEIGHTS',
  async () => {
    try {
      const response = await instanceAxios.get('/weight');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteWeight = createAsyncThunk(
  'weight/DELETE_WEIGHTS',
  async (id: number) => {
    try {
      await instanceAxios.delete(`/weight/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export {
  actionWeightUpdate,
  fetchWeight,
  fetchGraphicWeight,
  fetchAllWeights,
  deleteWeight,
};
