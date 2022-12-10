import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherReducer } from './weather-reducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof store.getState>;

// типизация хука dispatch в папке hooks
export type AppDispatch = typeof store.dispatch;
