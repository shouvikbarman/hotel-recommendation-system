// HotelDetailsPage.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Assuming you're using react-router-dom for routing
import { Typography, Box, Grid, Button, Rating } from "@mui/material";
import useApi from "../../hooks/useApi";
import Hotel from "../../models/hotel";
import CircularProgress from "@mui/joy/CircularProgress";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangePickerDialog from "../../components/dialog";
import { useAuth } from "../../context/AuthContext";
import { BookingStatus } from "../../models/booking";
import getHowGoodRating from "../../utils/howGood";
interface HotelDetailsPageProps {
  // You can define any additional props if needed
}

const HotelDetailsPage: React.FC<HotelDetailsPageProps> = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [open, setOpen] = useState(false);

  const { data: hotelDetails, loading } = useApi<Hotel | undefined>(
    `/api/hotels/${hotelId}`,
    { method: "GET" },
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const { price, name, location, img, rating, user_rating, visits, bookings } =
    hotelDetails || {};

  if (loading) return <FullScreenLoader />;

  return (
    <>
      <Grid container direction={"column"}>
        <Grid item mb={5} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h2" gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item md={6}>
            <Box
              component="img"
              src={img}
              height={"500px"}
              sx={{ objectFit: "cover" }}
            />
          </Grid>
          <Grid
            item
            container
            direction={"column"}
            md={6}
            justifyContent={"space-between"}
            height={"500px"}
          >
            {user_rating && (
              <Grid
                item
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Rating name="read-only" value={rating} readOnly size="large" />
                <Box display={"flex"} alignItems={"center"}>
                  <Typography mr={2}>{getHowGoodRating(user_rating)}</Typography>
                  <CircularProgress
                    determinate
                    size="lg"
                    value={user_rating * 10}
                  >
                    {user_rating}
                  </CircularProgress>
                </Box>
              </Grid>
            )}
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box display={"flex"}>
                <LocationOnIcon fontSize="large" />
                <Typography variant="body2" fontSize={20}>
                  {location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography variant="body2" fontSize={20}>
                  {visits} visits
                </Typography>
                <Typography variant="body2" fontSize={20}>
                  {
                    bookings?.filter(
                      (booking) => booking.status === BookingStatus.COMPLETED,
                    ).length
                  }{" "}
                  Confirmed Bookings
                </Typography>
                <Typography variant="body2" fontSize={20}>
                  {
                    bookings?.filter(
                      (booking) => booking.status === BookingStatus.DRAFT,
                    ).length
                  }{" "}
                  Draft Bookings
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h5" color="primary">
                ${price} per night
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (user ? setOpen(true) : navigate("/signin"))}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <DateRangePickerDialog
          open={open}
          onClose={() => setOpen(false)}
          hotelId={hotelId || ""}
          userId={user?._id || ""}
        />
      )}
    </>
  );
};

export default HotelDetailsPage;
