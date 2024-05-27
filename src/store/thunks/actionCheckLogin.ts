import { createAsyncThunk } from '@reduxjs/toolkit';

// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';
import { RootState } from '../store';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await instanceAxios.post('/login', {
      email: state.user.credentials.email,
      password: state.user.credentials.password,
    });
    const { pseudo, token } = response.data;

    return { pseudo, token };
  }
);

export default actionCheckLogin;
