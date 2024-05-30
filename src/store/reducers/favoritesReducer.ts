import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchFavorites from '../thunks/thunkFetchFavorites';
import thunkAddFavorite from '../thunks/thunkAddFavorite';

interface IFavorite {
  activity_id: number;
  activity_name: string;
  activity_met: string;
  created_at: string;
}

interface FavoritesState {
  favoritesList: IFavorite[];
}

const initialState: FavoritesState = {
  favoritesList: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionThunkFetchFavorites.fulfilled, (state, action) => {
      state.favoritesList = action.payload;
    })
    .addCase(thunkAddFavorite.fulfilled, (state, action) => {
      state.favoritesList.push(action.payload);
    });
});

export default favoritesReducer;
