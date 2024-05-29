import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instanceAxios from '../../axios/axiosInstance';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';
import { addLoggedStatusToLocalStorage } from '../../localStorage/localStorage';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const response = await instanceAxios.post('/login', {
        pseudo: state.user.credentials.pseudo,
        password: state.user.credentials.password,
      });
      const { token } = response.data;
      console.log('réponse API login: ', response.data);

      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);
      addLoggedStatusToLocalStorage('yes'); // Mettre à jour le statut de connexion

      return { token };
    } catch (error) {
      console.error('Login error:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }

      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export default actionCheckLogin;
