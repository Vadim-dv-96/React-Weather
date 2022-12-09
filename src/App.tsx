import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import './App.css';
import { AddCityForm } from './components/AddCityForm/AddCityForm';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getCurrentCityNameRequest, getWeatherCurrentCity } from './state/weather-reducer';
import { WeatherCard } from './components/WeatherCard/WeatherCard';

import s from './components/AddCityForm/style.module.css';
import s_weatherCard from './components/WeatherCard/style.module.css';

function App() {
  const dispatch = useAppDispatch();
  // const currentCityName = useAppSelector((state) => state.weather.cityNameRequest);
  const weather = useAppSelector((state) => state.weather.weather);

  console.log(weather);

  const addCity = (city: string) => {
    dispatch(getCurrentCityNameRequest({ cityNameRequest: city }));
    dispatch(getWeatherCurrentCity({ cityName: city }));
  };

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
      <div className="container">
        <div className={s.addCityForm}>
          <AddCityForm addCity={addCity} />
        </div>
        <div className={s_weatherCard.wrapper}>
          {weather.map((weather) => {
            return <WeatherCard key={weather.id} weather={weather} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
