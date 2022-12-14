import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { GetCoordinatesAPI } from '../api/getCoordinates-api';
import { GetWeatherAPI, WeatherResponseType } from '../api/getWeather-api';

export type WeatherStateType = Array<DomainWeatherType>;

export type DomainWeatherType = WeatherResponseType & {
  nameCityInCard: string;
};

export const initialState = {
  cityNameRequest: [] as string[],
  weather: [] as WeatherStateType,
  error: null as null | string,
  loading: false,
};

export const getWeatherCurrentCity = createAsyncThunk(
  'weather/getWeatherCurrentCity',
  async (params: { cityName: string }, thunkApi) => {
    try {
      const coordinates = await GetCoordinatesAPI.getCoordinates(params.cityName);
      const resWeather = await GetWeatherAPI.getWeather(coordinates.lat, coordinates.lon);
      return { resWeather, cityName: coordinates.local_names.ru };
    } catch (err) {
      const error: AxiosError = err as AxiosError;
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getWeatherReload = createAsyncThunk(
  'weather/getWeatherReload',
  async (params: { cityName: string }, thunkApi) => {
    try {
      const coordinates = await GetCoordinatesAPI.getCoordinates(params.cityName);
      const resWeather = await GetWeatherAPI.getWeather(coordinates.lat, coordinates.lon);
      return { resWeather, cityName: coordinates.local_names.ru };
    } catch (err) {
      const error: AxiosError = err as AxiosError;
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getCurrentCityNameRequest: (state, action: PayloadAction<{ cityNameRequest: string }>) => {
      state.cityNameRequest.push(action.payload.cityNameRequest.toLowerCase());
      if (!!state.cityNameRequest) {
        localStorage.setItem('city', JSON.stringify(state.cityNameRequest));
      }
    },
    deleteCityCard: (state, action: PayloadAction<{ cityName: string }>) => {
      state.weather = state.weather.filter((weather) => {
        return weather.nameCityInCard !== action.payload.cityName;
      });
      state.cityNameRequest = state.cityNameRequest.filter((city) => {
        return city !== action.payload.cityName;
      });
    },
    setError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers(builder) {
    builder.addCase(getWeatherCurrentCity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherCurrentCity.fulfilled, (state, action) => {
      const newWeather = action.payload.resWeather;
      const domainNewWeather: DomainWeatherType = { ...newWeather, nameCityInCard: action.payload.cityName };
      state.weather.unshift(domainNewWeather);
      state.loading = false;
    });
    builder.addCase(getWeatherCurrentCity.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(getWeatherReload.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWeatherReload.fulfilled, (state, action) => {
      const newWeather = action.payload.resWeather;
      const domainNewWeather: DomainWeatherType = { ...newWeather, nameCityInCard: action.payload.cityName };
      state.weather = state.weather.map((weather) => {
        return weather.nameCityInCard === action.payload.cityName ? domainNewWeather : weather;
      });
      state.loading = false;
    });
    builder.addCase(getWeatherReload.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const { getCurrentCityNameRequest, deleteCityCard, setError } = slice.actions;
export const weatherReducer = slice.reducer;
