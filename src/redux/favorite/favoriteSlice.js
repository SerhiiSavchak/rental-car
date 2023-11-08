import { createSlice } from '@reduxjs/toolkit';

const favoriteInitialState = [];

const favoriteSlice = createSlice({
  // Имя слайса
  name: 'favorite',
  // Начальное состояние редюсера слайса
  initialState: favoriteInitialState,
  // Объект редюсеров
  reducers: {
    setFavorite(state, action) {
      state.push(action.payload);
    },
    deleteFavorite(state, action) {
      state = state.filter(car => car.id !== action.payload);
    },
  },
});

export const { setFavorite, deleteFavorite } = favoriteSlice.actions;
// Редюсер слайса
export const favoriteReducer = favoriteSlice.reducer;
