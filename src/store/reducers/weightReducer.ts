/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  actionWeightUpdate,
  fetchWeight,
  fetchGraphicWeight,
  fetchAllWeights,
  deleteWeight,
} from '../thunks/actionWeightUpdate';

interface WeightState {
  value: number | null;
  date: string | null;
  allWeights: { value: number; date: string; id: number }[] | null;
  id: number | null;
}

const initialState: WeightState = {
  value: null,
  date: null,
  allWeights: null,
  id: null,
};

const weightReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchWeight.fulfilled,
      (
        state,
        action: PayloadAction<{ value: number; date: string; id: number }>
      ) => {
        state.value = action.payload.value;
        state.date = action.payload.date;
        state.id = action.payload.id;
      }
    )
    .addCase(
      actionWeightUpdate.fulfilled,
      (
        state,
        action: PayloadAction<{ weight: number; date: string; id: number }>
      ) => {
        state.value = action.payload.weight;
        state.date = action.payload.date;
        state.id = action.payload.id;
      }
    )
    .addCase(fetchGraphicWeight.fulfilled, (state, action) => {
      state.value = action.payload.map(
        (entry: { weight: any }) => entry.weight
      );
      state.date = action.payload.map((entry: { date: any }) => entry.date);
    })
    .addCase(fetchAllWeights.fulfilled, (state, action) => {
      return {
        ...state,
        allWeights: action.payload,
      };
    })
    .addCase(deleteWeight.fulfilled, (state, action) => {
      state.allWeights = state.allWeights.filter(
        (eachWeight) => eachWeight.id !== action.payload
      );
    });
});
export default weightReducer;
