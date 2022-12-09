import { Button } from '@mui/material';
// import { WeatherResponseType } from '../../api/getWeather-api';
import { DomainWeatherType } from '../../state/weather-reducer';
// import { useAppSelector } from '../../hooks/hooks';
import s from './style.module.css';

type WeatherCardPropsType = {
  weather: DomainWeatherType;
};

export const WeatherCard = (props: WeatherCardPropsType) => {
  // const nameCityInCard = useAppSelector((state) => state.weather.nameCityInCard);
  // console.log(nameCityInCard);
  console.log(props.weather.weather[0].icon);

  return (
    <div className={s.card}>
      <div className={s.thisDay}>
        <div className={s.thisDayWrapper}>
          <div className={s.thisDayLeft}>
            <div className={s.thisDayTemp}>{Math.floor(props.weather.main.temp)}°</div>
            <div className={s.thisDayCurrentDay}>Сегодня</div>
          </div>

          <div className={s.thisDayRight}>
            <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt="logo" />
          </div>
        </div>
        <div className={s.thisDayTime}>Время:</div>
        <div className={s.thisDayCity}>Город: {props.weather.nameCityInCard} </div>
      </div>
      <div className="btn">
        <Button size="small" variant="outlined">
          LEARN MORE
        </Button>
      </div>
    </div>
  );
};
