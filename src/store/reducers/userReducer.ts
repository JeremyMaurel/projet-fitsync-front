/* eslint-disable import/no-cycle */
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import actionCheckLogin from '../thunks/actionCheckLogin';
import actionThunkFetchUser from '../thunks/thunkFetchUser';
import { addLoggedStatusToLocalStorage } from '../../localStorage/localStorage';

interface UserState {
  logged: boolean;
  credentials: {
    pseudo: string;
    password: string;
  };
  email: null | string;
  token: null | string;
  error: null | string;
  id: null | string;
  role: null | string;
  birthdate: null | string;
  gender: null | string;
  height: null | number;
  weight: null | number;
  objective: null | number;
}

const initialState: UserState = {
  logged: false,
  credentials: {
    pseudo: '',
    password: '',
  },
  email: '',
  token: '',
  error: '',
  id: '',
  role: '',
  birthdate: '',
  gender: '',
  height: null,
  weight: 70,
  objective: null,
};

export const actionChangeCredential = createAction<{
  name: 'pseudo' | 'password';
  value: string;
}>('user/CHANGE_CREDENTIAL');

export const actionLogOut = createAction('user/LOGOUT');

// Cette action est dispatchée si, au chargement de l'App, il y a un token dans le localStorage pour se connecter
export const actionCheckLogIn = createAction<{ jwt: string; pseudo: string }>(
  'user/LOGIN'
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      actionChangeCredential,
      (
        state,
        action: PayloadAction<{ name: 'pseudo' | 'password'; value: string }>
      ) => {
        state.credentials[action.payload.name] = action.payload.value;
      }
    )
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      state.logged = true;
      state.token = action.payload.token;
      state.error = null;
      addLoggedStatusToLocalStorage('yes');
      localStorage.setItem('token', action.payload.token);
    })
    .addCase(actionCheckLogin.rejected, (state) => {
      state.error =
        'Connection refused, please check your pseudo and password inputs';
    })
    .addCase(actionLogOut, (state) => {
      state.logged = false;
      state.credentials.pseudo = '';
      state.credentials.password = '';
      state.token = null;
      state.error = null;
      addLoggedStatusToLocalStorage('');
      localStorage.removeItem('token');
    })
    .addCase(
      actionThunkFetchUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: string;
          email: string;
          pseudo: string;
          role: string;
          password: string;
          birthdate: string;
          gender: string;
          height: number;
          weight: number;
          objective: number;
        }>
      ) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.credentials.pseudo = action.payload.pseudo;
        state.role = action.payload.role;
        state.credentials.password = action.payload.password;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.weight = action.payload.weight;
        state.objective = action.payload.objective;
      }
    );
});

export default userReducer;
