import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://654b7d865b38a59f28ef2b02.mockapi.io/api';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const { data } = await axios.get('advert', {
        params: { limit, page },
      });

      return data;
    } catch (error) {
      console.log(error);

      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get('advert', {
        params: { id },
      });

      return data;
    } catch (error) {
      console.log(error);

      thunkAPI.rejectWithValue(error.message);
    }
  }
);
