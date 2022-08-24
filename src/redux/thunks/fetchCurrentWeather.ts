import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrentWeather = createAsyncThunk(
  'users/fetchCurrentWeather',
  async (params: TFetchWeather) => {
    const { city, lat, lon } = params;
    const cityP = city === '' ? '' : `&q=${city}`;
    const latP = lat === 0 ? '' : `&lat=${lat}`;
    const lonP = lon === 0 ? '' : `&lon=${lon}`;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?&units=metric${cityP}${latP}${lonP}&lang=ru&appid=670678e438297434cd3e1258af43ecd2`,
    );
    return response.data;
  },
);

type TFetchWeather = {
  lat: number;
  lon: number;
  city: string;
};

type TWeather = {
  clouds: {
    all: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    feels_like: number;
    temp: number;
    pressure: number;
  };
  timezone: number;
  dt: number;
  weather: [{ description: string; icon: string }];
  wind: { deg: number; speed: number };
  name: string;
};

type TCurrentWeather = {
  item: TWeather;
  status: 'error' | 'successful' | 'loading';
};

const initialState = {
  item: {
    clouds: { all: 0 },
    coord: { lon: 0, lat: 0 },
    main: { temp: 0, feels_like: 0, pressure: 0 },
    timezone: 0,
    dt: 0,
    weather: [{ description: '', icon: '' }],
    wind: {
      deg: 0,
      speed: 0,
    },
    name: '',
  },
  status: 'loading',
} as TCurrentWeather;

const currentWeather = createSlice({
  name: 'currentweather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = 'successful';
    });
    builder.addCase(fetchCurrentWeather.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(fetchCurrentWeather.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export default currentWeather.reducer;
