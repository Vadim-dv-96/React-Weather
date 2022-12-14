import { useMainHandlers } from '../../hooks/useMainHandlers';
import { AutoSearch } from '../AutocompleteSearch/AutoSearch';
import { WeatherList } from '../WeatherList/WeatherList';

import s from '../AutocompleteSearch/style.module.css';
import style from '../../components/WeatherList/style.module.css';

export const MainList = () => {
  const { addCity, deleteCity, updateCurrentWeather } = useMainHandlers();

  return (
    <div>
      <div className={s.addCityForm}>
        <AutoSearch addCity={addCity} />
      </div>
      <div className={style.wrapper}>
        <WeatherList deleteCity={deleteCity} updateCurrentWeather={updateCurrentWeather} />
      </div>
    </div>
  );
};
