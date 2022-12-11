import { Button, IconButton, Skeleton } from '@mui/material';
import { DomainWeatherType } from '../../state/weather-reducer';
import Delete from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import s from './style.module.css';
import { useAppSelector } from '../../hooks/hooks';

type WeatherCardPropsType = {
  weather: DomainWeatherType;
  deleteCity: (nameCity: string) => void;
  updateCurrentWeather: (city: string) => void;
};

export const WeatherCard = ({ weather, deleteCity, updateCurrentWeather }: WeatherCardPropsType) => {
  // const nameCityInCard = useAppSelector((state) => state.weather.nameCityInCard);
  // console.log(nameCityInCard);
  // console.log(props.weather.weather[0].icon);
  // const currentCityName = useAppSelector((state) => state.weather.cityNameRequest);
  // console.log(currentCityName);
  const isLoading = useAppSelector((state) => state.weather.loading);

  const time = new Date(weather.dt * 1000);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const deleteCityHandler = () => {
    deleteCity(weather.nameCityInCard);
  };

  const updateCurrentWeatherHandler = () => {
    updateCurrentWeather(weather.nameCityInCard);
  };
  debugger;
  return (
    <>
      {isLoading ? (
        <>
          {[...new Array(3)].map((_, i) => (
            <div style={{ width: '350px', height: '200px' }}>
              <Skeleton
                key={i}
                style={{ borderRadius: '20px' }}
                sx={{ bgcolor: '#eff1f5' }}
                variant="rectangular"
                width={350}
                height={200}
              />
            </div>
          ))}
        </>
      ) : (
        <div className={s.card}>
          <div className={s.btnWrapper}>
            <div className={s.reloadBtn}>
              <IconButton onClick={updateCurrentWeatherHandler}>
                <RefreshIcon fontSize="inherit" />
              </IconButton>
            </div>
            <div className={s.deleteBtn}>
              <IconButton onClick={deleteCityHandler}>
                <Delete fontSize="inherit" />
              </IconButton>
            </div>
          </div>
          <div className={s.thisDay}>
            <div className={s.thisDayWrapper}>
              <div className={s.thisDayLeft}>
                <div className={s.thisDayTemp}>{Math.floor(weather.main.temp)}°</div>
                <div className={s.thisDayCurrentDay}>Сегодня</div>
              </div>

              <div className={s.thisDayRight}>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="logo" />
              </div>
            </div>
            <div className={s.thisDayTime}>
              Время: {hours}:{minutes}
            </div>
            <div className={s.thisDayCity}>Город: {weather.nameCityInCard} </div>
          </div>
          <div className={s.btnInfo}>
            <Button size="small" variant="outlined">
              LEARN MORE
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
