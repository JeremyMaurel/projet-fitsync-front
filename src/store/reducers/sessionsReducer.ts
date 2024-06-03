// Import of librairies or technical components
import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchSessions from '../thunks/thunkFetchSessions.js';
import thunkAddSession from '../thunks/thunkAddSession.js';
// Import of custom types
import type ISession from '../../@types/session.js';

// --- THE INITIAL STATE AND ITS TYPE

interface ISessionsState {
  sessionsList: ISession[];
}
const initialState: ISessionsState = {
  sessionsList: [],
};

// --- THE ACTIONS

// --- THE REDUCER
const sessionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionThunkFetchSessions.fulfilled, (state, action) => {
      state.sessionsList = action.payload;
      // console.log(state.sessionsList);
    })
    .addCase(thunkAddSession.fulfilled, (state, action) => {
      state.sessionsList.push(action.payload);
    });
});

export default sessionsReducer;
