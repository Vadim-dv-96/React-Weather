import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import s from './style.module.css';
import Temp from '../../img/temp.svg';
import Pressure from '../../img/pressure.svg';
import Wind from '../../img/wind.svg';
import Precipitation from '../../img/precipitation.svg';
import Button from '@mui/material/Button';

export const DetailedWeather = () => {
  const { city } = useParams<{ city: string }>();
  console.log(city);

  const currentWeather = useAppSelector((state) =>
    state.weather.weather.filter((w) => {
      return w.nameCityInCard === city;
    })
  );
  console.log(currentWeather);

  return (
    <>
      <NavLink style={{ textDecoration: 'none', marginTop: '12px' }} to={`/`}>
        <Button size="small" variant="outlined">
          назад
        </Button>
      </NavLink>

      <div className={s.detailCard}>
        <div className={s.cloud}>
          <img className={s.cloudImg} src={require('../../img/cloud.png')} alt="cloud" />
        </div>
        <div className={s.detailCardContent}>
          <div className={s.tempInfoWrapper}>
            <div className={s.tempInfo}>
              <img className={s.tempInfoImg} src={Temp} alt="temp" />
            </div>
            <div className={s.tempTitle}>Температура</div>
            <div className={s.tempValueWrapper}>
              {currentWeather.map((w) => {
                return (
                  <div key={w.id} className={s.tempValue}>
                    {Math.floor(w.main.temp)}° - <span className={s.feelsLike}>ощущается как</span>{' '}
                    {Math.floor(w.main.feels_like)}°
                  </div>
                );
              })}
            </div>
          </div>

          <div className={s.pressureInfoWrapper}>
            <div className={s.pressureInfo}>
              <img className={s.pressureInfoImg} src={Pressure} alt="pressure" />
            </div>
            <div className={s.pressureTitle}>Давление</div>
            <div className={s.pressureValueWrapper}>
              {currentWeather.map((w) => {
                return (
                  <div key={w.id} className={s.pressureValue}>
                    {Math.floor(w.main.pressure / 1.33)} <span>мм ртутного столба</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={s.windInfoWrapper}>
            <div className={s.windInfo}>
              <img className={s.windInfoImg} src={Wind} alt="wind" />
            </div>
            <div className={s.windTitle}>Ветер</div>
            <div className={s.windValueWrapper}>
              {currentWeather.map((w) => {
                return (
                  <div key={w.id} className={s.windValue}>
                    {Math.floor(w.wind.speed)} <span>м/с</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={s.precipitationInfoWrapper}>
            <div className={s.precipitationInfo}>
              <img className={s.precipitationInfoImg} src={Precipitation} alt="precipitation" />
            </div>
            <div className={s.precipitationTitle}>Осадки</div>
            <div className={s.precipitationValueWrapper}>
              {currentWeather.map((w) => {
                return (
                  <div key={w.id} className={s.precipitationValue}>
                    {w.weather[0].description}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
