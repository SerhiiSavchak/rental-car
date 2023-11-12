import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
  client: {
    rentalPrice: '',
    mileageFrom: '',
    mileageTo: '',
  },
  server: {
    make: '',
  },
};

const filterSlice = createSlice({
  // Имя слайса
  name: 'filter',
  // Начальное состояние редюсера слайса
  initialState: filterInitialState,
  // Объект редюсеров
  reducers: {
    setClientFilter(state, action) {
      state.client = { ...state.client, ...action.payload };
      return state;
    },
    setServerFilter(state, action) {
      state.server.make = action.payload;
      return state;
    },
    deleteFilter(state, action) {
      state = filterInitialState;
      return state;
    },
  },
});

export const { setClientFilter, setServerFilter, deleteFilter } =
  filterSlice.actions;
// Редюсер слайса
export const filterReducer = filterSlice.reducer;
