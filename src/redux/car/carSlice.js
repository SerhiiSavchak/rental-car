import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from './carOperations';
const contactsInitialState = {
  cars: [],
  currentCar: null,
  isLoading: false,
  error: null,
};

const carSlice = createSlice({
  // Имя слайса
  name: 'cars',
  // Начальное состояние редюсера слайса
  initialState: contactsInitialState,
  // Объект редюсеров
  reducers: {
    deleteCurrentCar(state, action) {
      state.currentCar = null;
    },
  },
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
      })
      .addCase(fetchCarById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCar = action.payload[0];
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Редюсер слайса
export const carReducer = carSlice.reducer;
export const { deleteCurrentCar } = carSlice.actions;
