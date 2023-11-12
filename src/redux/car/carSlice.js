import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from './carOperations';
const contactsInitialState = {
  cars: [],
  carResponse: [],
  showModal: false,
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
      state.showModal = false;
    },
    deleteCars(state, action) {
      state.cars = [];
    },
    deleteCarResponse(state, action) {
      state.carResponse = [];
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

        state.carResponse = action.payload;
        state.cars.push(...action.payload);
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
        state.showModal = true;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Редюсер слайса
export const carReducer = carSlice.reducer;
export const { deleteCurrentCar, deleteCars, deleteCarResponse } =
  carSlice.actions;
