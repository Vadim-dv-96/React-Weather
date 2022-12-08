import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import './App.css';
import { AddCityForm } from './components/AddCityForm/AddCityForm';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getWeatherCurrentCity } from './state/weather-reducer';

import s from './components/AddCityForm/style.module.css';

function App() {
  const dispatch = useAppDispatch();
  const currentCityName = useAppSelector((state) => state.weather.cityNameRequest);
  const weather = useAppSelector((state) => state.weather.weather);

  useEffect(() => {
    dispatch(getWeatherCurrentCity({ cityName: currentCityName[0] }));
  }, [dispatch, currentCityName]);

  console.log(weather);

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
          <AddCityForm />
        </div>
      </div>
    </div>
  );
}

export default App;
