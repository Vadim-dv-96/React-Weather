import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import s from './style.module.css';
import Button from '@mui/material/Button';
import { DomainWeatherType } from '../../state/weather-reducer';
import { PrecipitationIcon, PressureIcon, TempIcon, WindIcon } from '../../assets/Icon/Icons';

export const DetailedWeather = () => {
  const { city } = useParams<{ city: string }>();

  const currentWeather = useAppSelector((state) =>
    state.weather.weather.find((w) => {
      return w.nameCityInCard === city;
    })
  );

  function parseCurrentWeather(weather: DomainWeatherType | undefined) {
    if (!weather) {
      return [];
    }
    return [
      {
        icon: TempIcon,
        title: 'Температура',
        description: `${Math.floor(weather.main.temp)}°, ощущается как ${Math.floor(weather.main.feels_like)}°`,
      },
      {
        icon: PressureIcon,
        title: 'Давление',
        description: `${Math.floor(weather.main.pressure / 1.33)} мм ртутного столба`,
      },
      {
        icon: WindIcon,
        title: 'Ветер',
        description: `${Math.floor(weather.wind.speed)} м/с`,
      },
      {
        icon: PrecipitationIcon,
        title: 'Осадки',
        description: weather.weather[0].description,
      },
    ];
  }

  const weatherData = parseCurrentWeather(currentWeather);

  return (
    <div className={s.detailedWrapper}>
      <NavLink style={{ textDecoration: 'none', marginTop: '16px' }} to={`/`}>
        <Button size="small" variant="outlined">
          назад
        </Button>
      </NavLink>

      <div className={s.detailCard}>
        <div className={s.cloud}>
          <img className={s.cloudImg} src={require('../../img/cloud.png')} alt="cloud" />
        </div>
        <div className={s.detailCardContent}>
          {weatherData &&
            weatherData.map((el, index) => {
              const Icon = el.icon;
              return (
                <div key={index} className={s.infoWrapper}>
                  <div className={s.infoSvgWrapper}>
                    <Icon />
                  </div>
                  <div className={s.infoTitle}>{el.title}</div>
                  <div className={s.infoValue}>{el.description}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
