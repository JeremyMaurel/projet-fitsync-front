// Thunks created to fetch Activities from the API to serve their data to the app.
// using async thunks from toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Import de l'instance axios pour fetch l'api
import instanceAxiosLogged from '../../axios/axiosInstanceLogged';

const actionThunkFetchUser = createAsyncThunk(
  // naming the action type (best-practice from Solène)
  'user/FETCH_USER',

  // the callback to go fetch Activities data on API
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await instanceAxiosLogged.get('/user');
    console.log(
      'thunk FetchUser executed, API call, response : ',
      response.data
    );

    return response.data;
  }
);

export default actionThunkFetchUser;
