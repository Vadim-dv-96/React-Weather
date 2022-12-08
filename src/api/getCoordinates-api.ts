import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/',
  params: {
    appid: process.env.REACT_APP_API_KEY,
  },
});
type Local_namesType = {
  ar: string;
  be: string;
  ca: string;
  cs: string;
  de: string;
  en: string;
  eo: string;
  es: string;
  et: string;
  fr: string;
  he: string;
  hr: string;
  hu: string;
  hy: string;
  io: string;
  it: string;
  ja: string;
  ka: string;
  ko: string;
  ku: string;
  la: string;
  lt: string;
  lv: string;
  ml: string;
  nl: string;
  pl: string;
  pt: string;
  ro: string;
  ru: string;
  sk: string;
  sl: string;
  sr: string;
  tr: string;
  uk: string;
  zh: string;
};
export type CoordinatesResponseType = {
  country: string;
  lat: number;
  local_names: Local_namesType;
  lon: number;
  name: string;
  state: string;
};

export const GetCoordinatesAPI = {
  async getCoordinates(city: string) {
    const dataArray = await instance.get<Array<CoordinatesResponseType>>(`direct?q=${city}&limit=1`);
    return dataArray.data[0];
  },
};
