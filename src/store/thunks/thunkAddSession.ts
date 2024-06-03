// thunks/thunkAddSession.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

// Définition du type des données envoyées lors de l'ajout d'une session
interface NewSessionData {
  duration: number;
  activityId: number;
  date: string;
  comment?: string;
}

// Thunk pour ajouter une nouvelle session
const thunkAddSession = createAsyncThunk(
  'sessions/ADD_SESSION',
  async (newSession: NewSessionData) => {
    const { duration, activityId, date, comment } = newSession;
    try {
      const response = await instanceAxios.post('/sessions', {
        duration,
        activityId,
        date,
        comment,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding session:', error);
      throw error;
    }
  }
);

export default thunkAddSession;
