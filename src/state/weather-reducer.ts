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
  cityNameRequest: [''],
  // nameCityInCard: '',
  weather: [] as WeatherStateType,
  error: '',
  loading: false,
};

export const getWeatherCurrentCity = createAsyncThunk(
  'weather/getWeatherCurrentCity',
  async (params: { cityName: string }, thunkApi) => {
    try {
      const coordinates = await GetCoordinatesAPI.getCoordinates(params.cityName);
      debugger;
      // thunkApi.dispatch(setCityNameInCard({ cityName: coordinates.local_names.ru }));
      debugger;
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
      state.cityNameRequest.push(action.payload.cityNameRequest);
    },
    // setCityNameInCard: (state, action: PayloadAction<{ cityName: string }>) => {
    //   debugger;
    //   state.nameCityInCard = action.payload.cityName;
    // },
  },
  extraReducers(builder) {
    builder.addCase(getWeatherCurrentCity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWeatherCurrentCity.fulfilled, (state, action) => {
      state.loading = false;
      const newWeather = action.payload.resWeather;
      const domainNewWeather: DomainWeatherType = { ...newWeather, nameCityInCard: action.payload.cityName };
      state.weather.push(domainNewWeather);
    });
    builder.addCase(getWeatherCurrentCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { getCurrentCityNameRequest } = slice.actions;
export const weatherReducer = slice.reducer;
