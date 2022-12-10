import { AppBar, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import './App.css';
import { AddCityForm } from './components/AddCityForm/AddCityForm';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import {
  deleteCityCard,
  getCurrentCityNameRequest,
  getWeatherCurrentCity,
  getWeatherReload,
} from './state/weather-reducer';
import { useEffect } from 'react';
import { WeatherList } from './components/WeatherList/WeatherList';

import s from './components/AddCityForm/style.module.css';
import s_weatherCard from './components/WeatherCard/style.module.css';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.weather.loading);
  const currentCityName = useAppSelector((state) => state.weather.cityNameRequest);
  const weather = useAppSelector((state) => state.weather.weather);
  console.log('weather:', weather);
  console.log('currentCityName:', currentCityName);
  console.log('isLoading:', isLoading);

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem('city') as string);
    if (cities) {
      cities.forEach((cityStorage: string) => {
        dispatch(getCurrentCityNameRequest({ cityNameRequest: cityStorage }));
        dispatch(getWeatherCurrentCity({ cityName: cityStorage }));
      });
    }
  }, [dispatch]);

  const addCity = (city: string) => {
    debugger;
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
    debugger;
    dispatch(deleteCityCard({ cityName }));
  };

  const updateCurrentWeather = (cityUpdate: string) => {
    dispatch(getWeatherReload({ cityName: cityUpdate }));
  };
  debugger;
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography className="header-name" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>React Weather</div>
          </Typography>
        </Toolbar>
      </AppBar>
      {isLoading && <LinearProgress />}
      <div className="container">
        <div className={s.addCityForm}>
          <AddCityForm addCity={addCity} />
        </div>
        <div className={s_weatherCard.wrapper}>
          <WeatherList deleteCity={deleteCity} updateCurrentWeather={updateCurrentWeather} />
          {/* <>
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
          </> */}
        </div>
      </div>
    </div>
  );
}

export default App;
