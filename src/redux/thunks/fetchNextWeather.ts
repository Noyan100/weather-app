import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNextWeather = createAsyncThunk(
  'users/fetchNextWeather',
  async (params: TFetchNextWeather) => {
    const { city, lat, lon } = params;
    const cityP = city === '' ? '' : `&q=${city}`;
    const latP = lat === 0 ? '' : `&lat=${lat}`;
    const lonP = lon === 0 ? '' : `&lon=${lon}`;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric${cityP}${latP}${lonP}&lang=ru&appid=670678e438297434cd3e1258af43ecd2`,
    );
    return response.data;
  },
);

type TFetchNextWeather = {
  lat: number;
  lon: number;
  city: string;
};

export type TWeather = {
  list: {
    main: { temp: number };
    weather: [{ icon: string; description: string }];
    dt_txt: string;
  }[];
};

type TCurrentWeather = {
  item: TWeather;
  status: 'error' | 'successful' | 'loading';
};

const initialState = {
  item: {
    list: [
      {
        main: {
          temp: 0,
        },
        weather: [
          {
            icon: '',
            description: '',
          },
        ],
        dt_txt: '',
      },
    ],
  },
  status: 'loading',
} as TCurrentWeather;

const nextWeather = createSlice({
  name: 'nextweather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNextWeather.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = 'successful';
    });
    builder.addCase(fetchNextWeather.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(fetchNextWeather.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export default nextWeather.reducer;
