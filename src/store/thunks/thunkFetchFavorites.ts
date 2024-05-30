import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

const actionThunkFetchFavorites = createAsyncThunk(
  'favorites/FETCH_FAVORITES',

  async () => {
    const response = await instanceAxios.get('/favorites');

    console.log('thunk FetchFavorites : ', response.data.data);
    return response.data.data;
  }
);

export default actionThunkFetchFavorites;
