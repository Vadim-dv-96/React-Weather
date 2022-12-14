import {
  deleteCityCard,
  getCurrentCityNameRequest,
  getWeatherCurrentCity,
  getWeatherReload
} from "../state/weather-reducer";
import { useAppDispatch } from "./hooks";

export const useMainHandlers = () => {
  const dispatch = useAppDispatch();
  const addCity = (city: string) => {
    dispatch(getCurrentCityNameRequest({ cityNameRequest: city }));
    dispatch(getWeatherCurrentCity({ cityName: city }));
  };

  const deleteCity = (cityName: string) => {
    const citiesStorage = JSON.parse(localStorage.getItem('city') as string);
    if (citiesStorage) {
      const filteredCity = citiesStorage.filter((city: string) => {
        return city !== cityName.toLowerCase();
      });
      localStorage.setItem('city', JSON.stringify(filteredCity));
    }

    dispatch(deleteCityCard({ cityName }));
  };

  const updateCurrentWeather = (cityUpdate: string) => {
    dispatch(getWeatherReload({ cityName: cityUpdate }));
  };

  return {
    addCity,
    deleteCity,
    updateCurrentWeather,
  };
};
