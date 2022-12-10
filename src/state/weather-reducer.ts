import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { GetCoordinatesAPI } from '../api/getCoordinates-api';
import { GetWeatherAPI, WeatherResponseType } from '../api/getWeather-api';

// export type WeatherStateType = Array<WeatherResponseType>;
export type WeatherStateType = Array<DomainWeatherType>;

export type DomainWeatherType = WeatherResponseType & {
  nameCityInCard: string;
};

export const initialState = {
  cityNameRequest: [] as string[],
  weather: [] as WeatherStateType,
  error: '',
  loading: false,
};

export const getWeatherCurrentCity = createAsyncThunk(
  'weather/getWeatherCurrentCity',
  async (params: { cityName: string }, thunkApi) => {
    try {
      const coordinates = await GetCoordinatesAPI.getCoordinates(params.cityName);
      // thunkApi.dispatch(setCityNameInCard({ cityName: coordinates.local_names.ru }));
      const resWeather = await GetWeatherAPI.getWeather(coordinates.lat, coordinates.lon);
      return { resWeather, cityName: coordinates.local_names.ru };
    } catch (err) {
      const error: AxiosError = err as AxiosError;
      console.log(error.message);
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
      console.log(error.message);
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
      debugger;
      state.weather = state.weather.filter((weather) => {
        return weather.nameCityInCard !== action.payload.cityName;
      });
      debugger;
    },
  },
  extraReducers(builder) {
    builder.addCase(getWeatherCurrentCity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWeatherCurrentCity.fulfilled, (state, action) => {
      state.loading = false;
      const newWeather = action.payload.resWeather;
      const domainNewWeather: DomainWeatherType = { ...newWeather, nameCityInCard: action.payload.cityName };
      state.weather.unshift(domainNewWeather);
    });
    builder.addCase(getWeatherCurrentCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getWeatherReload.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWeatherReload.fulfilled, (state, action) => {
      state.loading = false;
      const newWeather = action.payload.resWeather;
      const domainNewWeather: DomainWeatherType = { ...newWeather, nameCityInCard: action.payload.cityName };
      // let currentCity = state.weather.filter((w) => {
      //   return w.nameCityInCard === action.payload.cityName;
      // });
      // currentCity = [domainNewWeather];
      state.weather = state.weather.map((weather) => {
        return weather.nameCityInCard === action.payload.cityName ? domainNewWeather : weather;
      });
    });
    builder.addCase(getWeatherReload.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { getCurrentCityNameRequest, deleteCityCard } = slice.actions;
export const weatherReducer = slice.reducer;
