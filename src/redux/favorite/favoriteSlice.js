import { createSlice } from '@reduxjs/toolkit';

const favoriteInitialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',

  initialState: favoriteInitialState,

  reducers: {
    setFavorite(state, action) {
      if (!state.favorite.includes(action.payload)) {
        state.favorite.push(action.payload);
      }
      return;
    },
    deleteFavorite(state, action) {
      state.favorite = state.favorite.filter(car => car !== action.payload);
    },
  },
});

export const { setFavorite, deleteFavorite } = favoriteSlice.actions;

export const favoriteReducer = favoriteSlice.reducer;
