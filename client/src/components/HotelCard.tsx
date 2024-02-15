// HotelCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
  CardActions,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import { BookingBody } from "../models/booking";
import getHowGoodRating from "../utils/howGood";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  user_rating: number | undefined;
  visits?: number | undefined;
  bookings?: BookingBody[] | undefined;
  onBook: () => void;
}

interface CardHeaderProps {
  name: string;
  rating: number;
  user_rating: number | undefined;
  location: string;
}

const UserRating = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CircularProgress
        determinate
        size="lg"
        {...props}
        value={props.value * 10}
      >
        {props.value}
      </CircularProgress>
      <Typography>{getHowGoodRating(props.value)}</Typography>
    </Box>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({
  name,
  rating,
  user_rating,
  location,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        <Typography variant="h6">{name}</Typography>
        <Box sx={{ display: "flex" }}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        <Rating name="read-only" value={rating} readOnly size="small" />
      </Box>

      {user_rating && <UserRating value={user_rating} thickness={4} />}
    </Box>
  );
};

const HotelCard: React.FC<HotelCardProps> = ({
  name,
  location,
  image,
  price,
  rating,
  user_rating,
  visits,
  bookings,
  id,
  onBook,
}) => {
  const navigate = useNavigate();
  return (
    <Card elevation={4} sx={{ minWidth: "20vw", width: "25vw", margin: 2, backgroundColor: "#fffee4", borderRadius: "5px" }}>
      <CardContent>
        <CardHeader
          name={name}
          rating={rating}
          user_rating={user_rating}
          location={location}
        />
      </CardContent>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0 10px 0",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/${id}`)}
      >
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={image}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Typography>Visits : {visits || 0}</Typography>
          <Typography>Bookings : {bookings?.length}</Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="primary">
          ${price} per night
        </Typography>
        <CardActions>
          <Button variant="contained" color="primary" onClick={onBook}>
            Book Now
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
