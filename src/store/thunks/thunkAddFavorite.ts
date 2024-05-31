import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const thunkAddFavorite = createAsyncThunk(
  'user/ADD_FAVORITE',
  async (activityId: number, thunkAPI) => {
    try {
      const response = await instanceAxios.post('/favorites', {
        newFavorite: activityId,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }
);

export default thunkAddFavorite;
