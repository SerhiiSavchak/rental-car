import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://654b7d865b38a59f28ef2b02.mockapi.io/api';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (page, thunkAPI) => {
    try {
      const { data } = await axios.get('advert', {
        params: { limit: 12, page },
      });
      console.log('data', data);

      return data;
    } catch (error) {
      console.log(error);

      thunkAPI.rejectWithValue(error.message);
    }
  }
);
