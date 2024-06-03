// userReducer.ts
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import actionLogin from '../thunks/actionLogin';
import actionLogout from '../thunks/actionLogout';
import actionThunkFetchUser from '../thunks/thunkFetchUser';
import actionCheckLogin from '../thunks/actionCheckLogin';
import actionUserUpdate from '../thunks/actionUserUpdate';

interface UserState {
  logged: boolean;
  credentials: {
    pseudo: string;
    password: string;
  };
  mail: null | string;
  token: null | string;
  error: null | string;
  id: null | string;
  role: null | string;
  birthdate: null | string;
  gender: null | string;
  height: null | number;
  objective: null | number;
}

const initialState: UserState = {
  logged: false,
  credentials: {
    pseudo: '',
    password: '',
  },
  mail: '',
  token: '',
  error: '',
  id: '',
  role: '',
  birthdate: null,
  gender: null,
  height: null,
  objective: null,
};

export const actionChangeCredential = createAction<{
  name: 'pseudo' | 'password';
  value: string;
}>('user/CHANGE_CREDENTIAL');

export const actionLogIn = createAction<{ jwt: string; pseudo: string }>(
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
    .addCase(
      actionCheckLogin.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: string;
          mail: string;
          pseudo: string;
          role: string;
          password: string;
          birthdate: string;
          gender: string;
          height: number;
          objective: number;
        }>
      ) => {
        state.logged = true;
        state.id = action.payload.id;
        state.mail = action.payload.mail;
        state.credentials.pseudo = action.payload.pseudo;
        state.role = action.payload.role;
        state.credentials.password = action.payload.password;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.objective = action.payload.objective;
      }
    )
    .addCase(actionCheckLogin.rejected, (state) => {
      state.logged = false;
    })
    .addCase(actionLogin.fulfilled, (state, action) => {
      state.logged = true;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(actionLogin.rejected, (state) => {
      state.error =
        'Connection refused, please check your pseudo and password inputs';
    })
    .addCase(actionLogout.fulfilled, (state) => {
      state.logged = false;
    })
    .addCase(
      actionThunkFetchUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: string;
          mail: string;
          pseudo: string;
          role: string;
          password: string;
          birthdate: string;
          gender: string;
          height: number;
          objective: number;
        }>
      ) => {
        state.id = action.payload.id;
        state.mail = action.payload.mail;
        state.credentials.pseudo = action.payload.pseudo;
        state.role = action.payload.role;
        state.credentials.password = action.payload.password;
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.objective = action.payload.objective;
      }
    )
    .addCase(
      actionUserUpdate.fulfilled,
      (
        state,
        action: PayloadAction<{
          birthdate: string;
          gender: string;
          height: number;
          pseudo: string;
          mail: string;
        }>
      ) => {
        state.birthdate = action.payload.birthdate;
        state.gender = action.payload.gender;
        state.height = action.payload.height;
        state.credentials.pseudo = action.payload.pseudo;
        state.mail = action.payload.mail;
      }
    );
});

export default userReducer;
