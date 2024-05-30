import { createAsyncThunk } from '@reduxjs/toolkit';
// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';
import IFavorite from '../../@types/favorite';

const thunkAddFavorite = createAsyncThunk(
  'favorites/ADD_FAVORITE',
  async (newFavorite) => {
    const response = await instanceAxios.post('/favorites', newFavorite);

    return response.data;
  }
);

export default thunkAddFavorite;
