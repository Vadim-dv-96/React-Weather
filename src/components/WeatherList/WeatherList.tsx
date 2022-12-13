import { useAppSelector } from '../../hooks/hooks';
import { WeatherCard } from '../WeatherCard/WeatherCard';

type WeatherListPropsType = {
  deleteCity: (nameCity: string) => void;
  updateCurrentWeather: (city: string) => void;
};

export const WeatherList = ({ deleteCity, updateCurrentWeather }: WeatherListPropsType) => {
  const weather = useAppSelector((state) => state.weather.weather);
  return (
    <>
      {weather.map((weather) => {
        return (
          <WeatherCard
            key={weather.id}
            weather={weather}
            deleteCity={deleteCity}
            updateCurrentWeather={updateCurrentWeather}
          />
        );
      })}
    </>
  );
};
