import { TextField } from '@mui/material';
import { RefObject, useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

type AutoSearchPropsType = {
  addCity: (city: string) => void;
};

export const AutoSearch = ({ addCity }: AutoSearchPropsType) => {
  // const [country, setCountry] = useState('ua');

  let { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_API_KEY_AUTOCOMPL,
    onPlaceSelected: (place) => {
      addCity(place.address_components[0].long_name);
    },
    // inputAutocompleteValue: 'country',
    // options: {
    //   componentRestrictions: { country },
    // },
  });

  //   const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //         addCityHandler();
  //     }
  //   };
  console.log(materialRef);

  return (
    <div>
      <div style={{ width: '300px' }}>
        <TextField
          onBlur={() => {
            materialRef = { current: null };
          }}
          fullWidth
          color="primary"
          variant="outlined"
          inputRef={materialRef}
        />
      </div>
      {/* <div style={{ width: '250px' }}>
        <span style={{ color: 'black' }}>Material UI</span>
        <Input
          //   onKeyPress={onKeyPressHandler}
          fullWidth
          color="primary"
          inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
            <Autocomplete
              apiKey={process.env.REACT_APP_API_KEY_AUTOCOMPL}
              {...props}
              onPlaceSelected={(selected) => console.log(selected)}
            />
          )}
        />
      </div> */}

      {/* <Autocomplete
        apiKey={process.env.REACT_APP_API_KEY_AUTOCOMPL}
        style={{ width: '90%' }}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        options={{
          types: ['(regions)'],
          componentRestrictions: { country: 'ua' },
        }}
        defaultValue="Amsterdam"
      /> */}
      {/* <TextField label="City" ref={ref} /> */}
    </div>
  );
};
