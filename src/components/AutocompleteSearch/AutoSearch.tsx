import { TextField } from '@mui/material';
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
  console.log(materialRef);

  return (
    <div>
      <div style={{ width: '300px' }}>
        <TextField fullWidth color="primary" variant="outlined" inputRef={materialRef} />
      </div>
    </div>
  );
};
