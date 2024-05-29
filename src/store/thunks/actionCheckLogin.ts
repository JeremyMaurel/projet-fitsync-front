import { createAsyncThunk } from '@reduxjs/toolkit';

// Import de l'instance axios pour fetch l'api
import instanceAxiosLogged from '../../axios/axiosInstanceLogged';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await instanceAxiosLogged.post('/login', {
      pseudo: state.user.credentials.pseudo,
      password: state.user.credentials.password,
    });
    const { pseudo, token } = response.data;

    return { pseudo, token };
  }
);

export default actionCheckLogin;
