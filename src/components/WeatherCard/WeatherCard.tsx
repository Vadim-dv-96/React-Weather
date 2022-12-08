import { Card, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const WeatherCard = () => {
  return (
    <Card className="content">
      <div className="content-item"></div>
      <div className="btn">
        <NavLink style={{ textDecoration: 'none' }} to={`/currentBeer/${''}`}>
          <Button size="small" variant="outlined">
            LEARN MORE
          </Button>
        </NavLink>
      </div>
    </Card>
  );
};
