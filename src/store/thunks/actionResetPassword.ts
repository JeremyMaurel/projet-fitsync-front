/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const actionResetPassword = createAsyncThunk(
  'user/RESET_PASSWORD',
  async (
    userMail: {
      mail: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await instanceAxios.post('/requestReset', userMail);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const actionNewPassword = createAsyncThunk(
  'user/NEW_PASSWORD',
  async (payload: string, thunkAPI) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      const response = await instanceAxios.post(
        `/resetPassword?token=${token}`,
        {
          newPassword: payload,
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user password'
      );
    }
  }
);

export { actionResetPassword, actionNewPassword };
