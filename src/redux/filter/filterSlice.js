import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = null;

const filterSlice = createSlice({
  // Имя слайса
  name: 'filter',
  // Начальное состояние редюсера слайса
  initialState: filterInitialState,
  // Объект редюсеров
  reducers: {
    setFilter(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setFilter } = filterSlice.actions;
// Редюсер слайса
export const filterReducer = filterSlice.reducer;
