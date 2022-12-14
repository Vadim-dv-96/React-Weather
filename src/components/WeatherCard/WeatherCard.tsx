import { Button, IconButton, Tooltip } from '@mui/material';
import { DomainWeatherType } from '../../state/weather-reducer';
import Delete from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import s from './style.module.css';
import { NavLink } from 'react-router-dom';

type WeatherCardPropsType = {
  weather: DomainWeatherType;
  deleteCity: (nameCity: string) => void;
  updateCurrentWeather: (city: string) => void;
};

export const WeatherCard = ({ weather, deleteCity, updateCurrentWeather }: WeatherCardPropsType) => {
  const time = new Date(weather.dt * 1000);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const getString = (num: number) => (num < 10 ? '0' + num : num);

  const deleteCityHandler = () => {
    deleteCity(weather.nameCityInCard);
  };

  const updateCurrentWeatherHandler = () => {
    updateCurrentWeather(weather.nameCityInCard);
  };

  return (
    <div className={s.card}>
      <div className={s.btnWrapper}>
        <div className={s.reloadBtn}>
          <Tooltip arrow title="обновить">
            <IconButton onClick={updateCurrentWeatherHandler}>
              <RefreshIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        <div className={s.deleteBtn}>
          <Tooltip arrow title="удалить">
            <IconButton onClick={deleteCityHandler}>
              <Delete fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={s.thisDay}>
        <div className={s.thisDayWrapper}>
          <div className={s.thisDayLeft}>
            <div className={s.thisDayTemp}>{Math.floor(weather.main.temp)}°</div>
            <div className={s.thisDayCurrentDay}>Сегодня</div>
          </div>

          <div className={s.thisDayRight}>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="logo" />
          </div>
        </div>
        <div className={s.thisDayTime}>
          Время расчета данных о погоде: {hours}:{getString(minutes)}
        </div>
        <div className={s.thisDayCity}>Город: {weather.nameCityInCard} </div>
      </div>
      <div className={s.btnInfo}>
        <NavLink style={{ textDecoration: 'none' }} to={`/currentWeather/${weather.nameCityInCard}`}>
          <Button size="small" variant="outlined">
            узнать больше
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
