import { createSlice } from '@reduxjs/toolkit';

const favoriteInitialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  // Имя слайса
  name: 'favorite',
  // Начальное состояние редюсера слайса
  initialState: favoriteInitialState,
  // Объект редюсеров
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
// Редюсер слайса
export const favoriteReducer = favoriteSlice.reducer;
