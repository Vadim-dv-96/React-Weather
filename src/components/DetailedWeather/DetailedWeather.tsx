import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import s from './style.module.css';
import Temp from '../../img/temp.svg';

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
      </div>
    </div>
  );
};
