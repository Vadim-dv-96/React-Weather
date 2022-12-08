import { configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './weather-reducer';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// типизация хука dispatch в папке hooks
export type AppDispatch = typeof store.dispatch;
