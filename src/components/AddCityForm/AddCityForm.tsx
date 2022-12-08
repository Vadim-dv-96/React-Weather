import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export const AddCityForm = () => {
  const [cityTitle, setCityTitle] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCityTitle(e.currentTarget.value);
  };
  return (
    <div>
      <TextField
        size="small"
        label="Enter city"
        variant="outlined"
        color="primary"
        value={cityTitle}
        onChange={inputHandler}
      />
      <Button variant="contained" color="primary">
        +
      </Button>
    </div>
  );
};
