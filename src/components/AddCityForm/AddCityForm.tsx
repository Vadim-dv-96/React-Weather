import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type AddCityFormPropsType = {
  addCity: (city: string) => void;
};

export const AddCityForm = (props: AddCityFormPropsType) => {
  const [cityTitle, setCityTitle] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCityTitle(e.currentTarget.value);
  };

  const addCityHandler = () => {
    props.addCity(cityTitle);
    setCityTitle('');
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addCityHandler();
    }
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
        onKeyPress={onKeyPressHandler}
      />
      <Button variant="contained" color="primary" onClick={addCityHandler}>
        +
      </Button>
    </div>
  );
};
