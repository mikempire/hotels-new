import {FC, useState} from 'react';
import {Box, CssBaseline, Container, Typography} from '@mui/material';
import Filters from './components/Filters';
import HotelList from './components/HotelList';
import hotelsData from './json/hotels.json';

const defaultFilters = {
  country: '',
  type: [],
  stars: [],
  reviews: '',
  minPrice: 0,
  maxPrice: 100500,
}

const App: FC = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [filteredHotels, setFilteredHotels] = useState(hotelsData.hotels);
  const [currentPage, setCurrentPage] = useState(1);

  const applyFilters = () => {
    let filtered = hotelsData.hotels;

    if (filters.country) {
      filtered = filtered.filter((hotel) => hotel.country === filters.country);
    }

    if (filters.type.length) {
      filtered = filtered.filter((hotel) => filters.type.includes(hotel.type));
    }

    if (filters.stars.length) {
      filtered = filtered.filter((hotel) => filters.stars.includes(hotel.stars));
    }

    if (filters.reviews) {
      filtered = filtered.filter((hotel) => hotel.reviews_amount >= parseInt(filters.reviews, 10));
    }

    const {minPrice, maxPrice} = filters;
    filtered = filtered.filter((hotel) => hotel.min_price >= minPrice && hotel.min_price <= maxPrice);

    setFilteredHotels(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setFilteredHotels(hotelsData.hotels);
    setCurrentPage(1);
  };

  return (
    <Box sx={{backgroundColor: '#f9f9f9', minHeight: '100vh', padding: 2}}>
      <CssBaseline/>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Поиск отелей
        </Typography>
        <Box sx={{display: 'flex', gap: 2}}>
          <Box sx={{flex: 1, maxWidth: 300}}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </Box>

          <Box sx={{flex: 3}}>
            <HotelList
              hotels={filteredHotels}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onClear={clearFilters}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
