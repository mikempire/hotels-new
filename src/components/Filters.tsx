import {
  Box,
  Button,
  Checkbox,
  Slider,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Autocomplete
} from '@mui/material';
import {Filter} from "../types/HotelTypes";
import {FC} from "react";

interface FiltersProps {
  filters: Filter,
  setFilters: (filters) => void;
  onApply: () => void,
  onClear: () => void,
}

type Options = {
  value: string,
  label: string
}

const Filters: FC<FiltersProps> = ({filters, setFilters, onApply, onClear}) => {
  const countryOptions: Options[] = [
    {value: 'Греция', label: 'Греция'},
    {value: 'Австрия', label: 'Австрия'},
    {value: 'Албания', label: 'Албания'},
  ];

  const typeOptions: Options[] = [
    {value: 'Апартаменты', label: 'Апартаменты'},
    {value: 'Отель', label: 'Отель'},
  ];

  console.log('filters', filters)
  const handleChange = (key, value) => {
    setFilters((prev) => ({...prev, [key]: value}));
  };

  return (
    <Box sx={{padding: 2, maxWidth: 300}}>
      <Typography variant="h6" gutterBottom>Фильтры</Typography>
      <Typography variant="subtitle1">Страна</Typography>
      <Autocomplete
        options={countryOptions}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => handleChange('country', value ? value.value : '')}
        value={countryOptions.find((option) => option.value === filters.country) || null}
        renderInput={(params) => <TextField {...params} placeholder="Поиск страны"/>}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        clearOnBlur
      />

      <Typography variant="subtitle1" sx={{marginTop: 2}}>
        Тип
      </Typography>
      <Autocomplete
        multiple
        options={typeOptions}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) =>
          handleChange('type', value.map((selectedOption) => selectedOption.value))
        }
        value={typeOptions.filter((option) => filters.type.includes(option.value))}
        renderInput={(params) => <TextField {...params} placeholder="Выберите тип"/>}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableCloseOnSelect
      />
      <Typography variant="subtitle1" sx={{marginTop: 2, marginBottom: 1}}>Количество звезд</Typography>
      <FormGroup>
        {[1, 2, 3, 4, 5].map((star) => (
          <FormControlLabel
            key={star}
            control={
              <Checkbox
                checked={filters.stars.includes(star)}
                onChange={(e) =>
                  handleChange(
                    'stars',
                    e.target.checked
                      ? [...filters.stars, star]
                      : filters.stars.filter((s) => s !== star)
                  )
                }
              />
            }
            label={`${star} звезда`}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle1" sx={{marginTop: 2, marginBottom: 1}}>Количество отзывов (от)</Typography>
      <TextField
        type="number"
        value={filters.reviews}
        onChange={(e) => {
          const value = e.target.value;
          handleChange('reviews', value === '' ? '' : Math.trunc(value));
        }}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
          }
        }}
        InputProps={{
          inputProps: { min: 0, max: 100 },
        }}
        placeholder="Например, от 10"
        fullWidth
      />

      <Typography variant="subtitle1" sx={{marginTop: 2}}>Цена</Typography>
      <Slider
        value={[filters.minPrice, filters.maxPrice]}
        min={0}
        max={100500}
        step={100}
        onChange={(e, value) => {
          if (Array.isArray(value)) {
            handleChange('minPrice', value[0]);
            handleChange('maxPrice', value[1]);
          }
        }}
        sx={{ flex: 1 }}
      />

      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <TextField
            label="От"
            value={filters.minPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 0 && value <= filters.maxPrice) {
                handleChange('minPrice', value);
              }
            }}

            inputProps={{
              step: 100,
              min: filters.minPrice,
              max: filters.maxPrice,
              type: 'number',
            }}
            sx={{ width: '100px' }}
          />

          <TextField
            label="До"
            value={filters.maxPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= filters.minPrice && value <= 100500) {
                handleChange('maxPrice', value);
              }
            }}

            inputProps={{
              step: 100,
              min: filters.minPrice,
              max: filters.maxPrice,
              type: 'number',
            }}
            sx={{ width: '100px' }}
          />
        </Box>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 3}}>
        <Button variant="contained" color="primary" onClick={onApply} sx={{marginBottom: 2}}>
          Применить фильтры
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClear}>
          Очистить фильтры
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
