import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  actionWeightUpdate,
  fetchWeight,
  fetchGraphicWeight,
  fetchAllWeights,
} from '../thunks/actionWeightUpdate';

interface WeightState {
  value: number | null;
  date: string | null;
  allWeights: { value: number; date: string }[] | null;
}

const initialState: WeightState = {
  value: null,
  date: null,
  allWeights: null,
};

const weightReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchWeight.fulfilled,
      (state, action: PayloadAction<{ value: number; date: string }>) => {
        state.value = action.payload.value;
        state.date = action.payload.date;
      }
    )
    .addCase(
      actionWeightUpdate.fulfilled,
      (state, action: PayloadAction<{ weight: number; date: string }>) => {
        state.value = action.payload.weight;
        state.date = action.payload.date;
      }
    )
    .addCase(fetchGraphicWeight.fulfilled, (state, action) => {
      state.value = action.payload.map((entry) => entry.weight);
      state.date = action.payload.map((entry) => entry.date);
    })
    .addCase(fetchAllWeights.fulfilled, (state, action) => {
      return {
        ...state,
        allWeights: action.payload,
      };
    });
});
export default weightReducer;
