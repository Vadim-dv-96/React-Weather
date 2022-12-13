import { weatherReducer } from '../weather-reducer';

describe('weatherSlice', () => {
  it('should return default state when passed an empty action', () => {
    const initialStateTest = {
      cityNameRequest: [],
      weather: [],
      error: null,
      loading: false,
    };
    const result = weatherReducer(undefined, { type: '' });
    expect(result).toBe(initialStateTest);
  });
});
