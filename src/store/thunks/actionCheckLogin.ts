import { createAsyncThunk } from '@reduxjs/toolkit';

// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await instanceAxios.post('/login', {
      pseudo: state.user.credentials.pseudo,
      password: state.user.credentials.password,
    });
    const { token } = response.data;
    console.log(response.data);

    return { token };
  }
);

export default actionCheckLogin;
