import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: process.env.REACT_APP_API_KEY,
  },
});
type MainType = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};
type SysType = {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
};
type WeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type WindType = {
  speed: number;
  deg: number;
  gust: number;
};
export type WeatherResponseType = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: MainType;
  name: string;
  sys: SysType;
  timezone: number;
  visibility: number;
  weather: Array<WeatherType>;
  wind: WindType;
};

export const GetWeatherAPI = {
  async getWeather(lat: number, lon: number) {
    const res = await instance.get<WeatherResponseType>(`weather?lat=${lat}&lon=${lon}&units=metric`);
    return res.data;
  },
};
