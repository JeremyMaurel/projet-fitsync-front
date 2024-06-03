// weightReducer.ts
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { actionWeightUpdate, fetchWeight } from '../thunks/actionWeightUpdate';

interface WeightState {
  value: number | null;
  date: string | null;
}

const initialState: WeightState = {
  value: null,
  date: null,
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
    );
});

export default weightReducer;
