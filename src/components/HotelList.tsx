import {Box, Card, CardContent, Typography, Pagination, Button, Rating} from '@mui/material';
import {Hotel} from "../types/HotelTypes";
import {FC, useState} from "react";


interface HotelListProps {
  hotels: Hotel[],
  currentPage: number,
  setCurrentPage: (page: number) => void,
  onClear: () => void,
}

const HotelList: FC<HotelListProps> = ({hotels, currentPage, setCurrentPage, onClear}) => {
  const [bookingHotels, setBookingHotels] = useState([]);
  const hotelsPerPage = 3;
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const displayedHotels = hotels.slice(startIndex, startIndex + hotelsPerPage);

  return (
    <Box sx={{padding: 2}}>
      {displayedHotels.length ? (
        displayedHotels.map((hotel) => {
          const booking = bookingHotels.includes(`${hotel.name}`);

          return (
            <Card key={hotel.name} sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
              <CardContent>
                <Typography variant="h6">{hotel.name}</Typography>

                <Typography variant="body2" sx={{marginTop: 1}}>
                  {hotel.description}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 1}}>
                  <Rating
                    name="hotel-stars"
                    value={hotel.stars}
                    readOnly
                    max={5}
                    precision={0.5}
                  />
                  <Typography variant="body2" sx={{marginLeft: 1}}>
                    ({hotel.stars} звезды)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{marginTop: 1}}>
                  Отзывов: {hotel.reviews_amount} | Рейтинг: {hotel.rating.toFixed(1)}
                </Typography>
                <Typography variant="subtitle1" sx={{marginTop: 1}}>
                  Цена: {hotel.min_price} ₽
                </Typography>
              </CardContent>
              <CardContent>
                <Button variant={booking ? 'contained' : 'outlined'}
                        onClick={() => {
                          if (!booking) {
                            setBookingHotels((prev) => [...prev, hotel.name]);
                          }
                        }}>{booking ? 'Забронировано' : 'Забранировать'}</Button>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography>Записей не найдено</Typography>
          <Button variant="outlined" color="secondary" onClick={onClear}>
            Очистить фильтры
          </Button>
        </Box>
      )}
      {
        !!hotels.length && <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 3}}>
					<Pagination
						count={Math.ceil(hotels.length / hotelsPerPage)}
						page={currentPage}
						onChange={(e, page) => setCurrentPage(page)}
					/>
				</Box>
      }
    </Box>
  );
};

export default HotelList;
