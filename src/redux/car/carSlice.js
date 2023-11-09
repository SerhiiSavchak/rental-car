import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './carOperations';
const contactsInitialState = {
  cars: [],

  isLoading: false,
  error: null,
};

const carSlice = createSlice({
  // Имя слайса
  name: 'cars',
  // Начальное состояние редюсера слайса
  initialState: contactsInitialState,
  // Объект редюсеров

  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Редюсер слайса
export const carReducer = carSlice.reducer;
