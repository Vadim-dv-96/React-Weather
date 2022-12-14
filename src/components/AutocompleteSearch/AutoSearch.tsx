import { TextField } from '@mui/material';
import { usePlacesWidget } from 'react-google-autocomplete';

import s from './style.module.css';

type AutoSearchPropsType = {
  addCity: (city: string) => void;
};

export const AutoSearch = ({ addCity }: AutoSearchPropsType) => {
  let { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_API_KEY_AUTOCOMPL,
    onPlaceSelected: (place) => {
      addCity(place.address_components[0].long_name);
    },
  });

  return (
    <div>
      <div className={s.textField}>
        <TextField
          placeholder="Введите название города"
          fullWidth
          color="primary"
          variant="outlined"
          inputRef={materialRef}
          onBlur={(e) => {
            e.currentTarget.value = '';
          }}
        />
      </div>
    </div>
  );
};
