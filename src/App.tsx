import { AppBar, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getCurrentCityNameRequest, getWeatherCurrentCity } from './state/weather-reducer';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DetailedWeather } from './components/DetailedWeather/DetailedWeather';
import { ErrorSnackbar } from './components/ErrorSnackbar/ErrorSnackbar';
import { MainList } from './components/MainList/MainList';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.weather.loading);

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem('city') as string);
    if (cities) {
      cities.forEach((cityStorage: string) => {
        dispatch(getCurrentCityNameRequest({ cityNameRequest: cityStorage }));
        dispatch(getWeatherCurrentCity({ cityName: cityStorage }));
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ErrorSnackbar />
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
        <Routes>
          <Route path="/" element={<MainList />}></Route>
          <Route path="currentWeather/:city" element={<DetailedWeather />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
