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
  name: 'filter',

  initialState: filterInitialState,

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

export const filterReducer = filterSlice.reducer;
