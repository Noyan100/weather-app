import { configureStore } from '@reduxjs/toolkit';
import citySlice from './slices/citySlice';
import currentWeather from './thunks/fetchCurrentWeather';
import nextWeather from './thunks/fetchNextWeather';

const store = configureStore({
  reducer: {
    nextWeather,
    currentWeather,
    citySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
