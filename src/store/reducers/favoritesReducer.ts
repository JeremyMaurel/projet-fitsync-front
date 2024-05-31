import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchFavorites from '../thunks/thunkFetchFavorites';
import IFavorite from '../../@types/favorite';

interface FavoritesState {
  favoritesList: IFavorite[];
}

const initialState: FavoritesState = {
  favoritesList: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionThunkFetchFavorites.fulfilled, (state, action) => {
    state.favoritesList = action.payload;
  });
});

export default favoritesReducer;
