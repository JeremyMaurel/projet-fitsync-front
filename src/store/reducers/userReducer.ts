// Import of librairies or technical components
import { createAction, createReducer } from '@reduxjs/toolkit';

// --- THE INITIAL STATE AND ITS TYPE

interface InitalUserState {
  id: null | number;
  isConnected: boolean;
  credentials: {
    pseudo: string;
    password: string;
  };
  email: null | string;
  age: null | number;
  weight: number;
  height: null | number;
}
const initialState: InitalUserState = {
  id: null,
  isConnected: false,
  credentials: {
    pseudo: '',
    password: '',
  },
  email: null,
  age: null,
  weight: 70,
  height: null,
};

// --- THE ACTIONS

// --- THE REDUCER
const userReducer = createReducer(initialState, (builder) => {});

export default userReducer;
