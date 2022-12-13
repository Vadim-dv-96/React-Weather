import {
  deleteCityCard,
  getCurrentCityNameRequest,
  getWeatherCurrentCity,
  getWeatherReload,
  setError,
  weatherReducer,
} from '../weather-reducer';

const initialStateTest = {
  cityNameRequest: [],
  weather: [],
  error: null,
  loading: false,
};
const filledInitialStateTest = {
  cityNameRequest: ['киев', 'одесса'],
  weather: [
    {
      nameCityInCard: 'киев',
      base: '',
      clouds: {
        all: 34,
      },
      cod: 34565,
      coord: {
        lon: 35.35,
        lat: 46.77,
      },
      dt: 3546547,
      id: 54563,
      main: {
        feels_like: 7,
        humidity: 35,
        pressure: 3456,
        temp: 6,
        temp_max: 8,
        temp_min: 5,
      },
      name: 'Киев',
      sys: {
        country: 'UA',
        id: 232334,
        sunrise: 356,
        sunset: 567,
        type: 45,
      },
      timezone: 47587,
      visibility: 20987,
      weather: [
        {
          id: 34,
          main: '',
          description: '',
          icon: '',
        },
      ],
      wind: {
        speed: 89,
        deg: 456,
        gust: 67,
      },
    },
    {
      nameCityInCard: 'одесса',
      base: '',
      clouds: {
        all: 34,
      },
      cod: 34565,
      coord: {
        lon: 35.35,
        lat: 46.77,
      },
      dt: 3546547,
      id: 54563,
      main: {
        feels_like: 7,
        humidity: 35,
        pressure: 3456,
        temp: 6,
        temp_max: 8,
        temp_min: 5,
      },
      name: 'Одесса',
      sys: {
        country: 'UA',
        id: 232334,
        sunrise: 356,
        sunset: 567,
        type: 45,
      },
      timezone: 47587,
      visibility: 20987,
      weather: [
        {
          id: 34,
          main: '',
          description: '',
          icon: '',
        },
      ],
      wind: {
        speed: 89,
        deg: 456,
        gust: 67,
      },
    },
  ],
  error: null,
  loading: false,
};
describe('weatherSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = weatherReducer(undefined, { type: '' });
    expect(result).toEqual(initialStateTest);
  });
  it('name must be obtained', () => {
    const city = 'Киев'.toLowerCase();
    const action = { type: getCurrentCityNameRequest.type, payload: { cityNameRequest: city } };
    const result = weatherReducer(initialStateTest, action);

    expect(result.cityNameRequest[0]).toBe('киев');
  });
  it('card should be deleted', () => {
    const city = 'Киев'.toLowerCase();
    const action = { type: deleteCityCard.type, payload: { cityName: city } };
    const result = weatherReducer(filledInitialStateTest, action);

    expect(result.weather.length).toBe(1);
    expect(result.cityNameRequest.length).toBe(1);
    expect(result.cityNameRequest[0]).toBe('одесса');
    expect(result.weather[0].nameCityInCard).toBe('одесса');
  });
  it('error must be set', () => {
    const action = { type: setError.type, payload: { error: 'Network error' } };
    const result = weatherReducer(initialStateTest, action);
    expect(result.error).toBe('Network error');
  });
});

describe('ExtraReducers for getWeatherCurrentCity', () => {
  it('loading should be changed with getWeatherCurrentCity.pending action', () => {
    const state = weatherReducer(initialStateTest, getWeatherCurrentCity.pending('args', { cityName: '' }));
    expect(state.loading).toBe(true);
  });
  it('should fetch weather with getWeatherCurrentCity.fulfilled action', () => {
    const weatherResponse = {
      nameCityInCard: 'киев',
      base: '',
      clouds: {
        all: 34,
      },
      cod: 34565,
      coord: {
        lon: 35.35,
        lat: 46.77,
      },
      dt: 3546547,
      id: 54563,
      main: {
        feels_like: 7,
        humidity: 35,
        pressure: 3456,
        temp: 6,
        temp_max: 8,
        temp_min: 5,
      },
      name: 'Киев',
      sys: {
        country: 'UA',
        id: 232334,
        sunrise: 356,
        sunset: 567,
        type: 45,
      },
      timezone: 47587,
      visibility: 20987,
      weather: [
        {
          id: 34,
          main: '',
          description: '',
          icon: '',
        },
      ],
      wind: {
        speed: 89,
        deg: 456,
        gust: 67,
      },
    };
    const city = 'Киев'.toLowerCase();
    const state = weatherReducer(
      initialStateTest,
      getWeatherCurrentCity.fulfilled({ resWeather: weatherResponse, cityName: city }, 'requestId', { cityName: city })
    );
    expect(state.loading).toBe(false);
    expect(state.weather[0].nameCityInCard).toBe('киев');
    expect(state.weather).toEqual([weatherResponse]);
  });
  it('should be changed loading and error with getWeatherCurrentCity.rejected action', () => {
    const state = weatherReducer(
      initialStateTest,
      getWeatherCurrentCity.rejected(
        { name: 'err', message: 'rejected' },
        'requestId',
        { cityName: '' },
        'network error'
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('network error');
  });
});

describe('ExtraReducers for getWeatherReload', () => {
  it('loading should be changed with getWeatherReload.pending action', () => {
    const state = weatherReducer(initialStateTest, getWeatherReload.pending('args', { cityName: '' }));
    expect(state.loading).toBe(true);
  });
  it('data should be updated with getWeatherReload.fulfilled action', () => {
    const weatherResponse = {
      nameCityInCard: 'киев',
      base: '',
      clouds: {
        all: 34,
      },
      cod: 34565,
      coord: {
        lon: 35.35,
        lat: 46.77,
      },
      dt: 3546549,
      id: 54563,
      main: {
        feels_like: 7,
        humidity: 35,
        pressure: 3456,
        temp: 8,
        temp_max: 9,
        temp_min: 6,
      },
      name: 'Киев',
      sys: {
        country: 'UA',
        id: 232334,
        sunrise: 356,
        sunset: 567,
        type: 45,
      },
      timezone: 47587,
      visibility: 20987,
      weather: [
        {
          id: 34,
          main: '',
          description: '',
          icon: '',
        },
      ],
      wind: {
        speed: 89,
        deg: 456,
        gust: 67,
      },
    };
    const city = 'Киев'.toLowerCase();
    const state = weatherReducer(
      filledInitialStateTest,
      getWeatherReload.fulfilled({ resWeather: weatherResponse, cityName: city }, 'requestId', { cityName: city })
    );
    expect(state.loading).toBe(false);
    expect(state.weather[0]).toEqual(weatherResponse);
    expect(state.weather[1]).toEqual(filledInitialStateTest.weather[1]);
    expect(state.weather[0].dt).toBe(3546549);
    expect(state.weather[0].main.temp).toBe(8);
    expect(state.weather[1].main.temp).toBe(6);
  });
  it('should be changed loading and error with getWeatherReload.rejected action', () => {
    const state = weatherReducer(
      initialStateTest,
      getWeatherReload.rejected({ name: 'err', message: 'rejected' }, 'requestId', { cityName: '' }, 'network error')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('network error');
  });
});
