import { Divider, Grid } from "@mui/material";
import HotelCard from "../../components/HotelCard";
import useApi from "../../hooks/useApi";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import Hotel from "../../models/hotel";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import DateRangePickerDialog from "../../components/dialog";
import { useNavigate } from "react-router-dom";
import { Recommendation } from "../../models/recommendation";
const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hotelId, setHotelId] = useState<string | null>(null);
  const { user } = useAuth();
  const { data, loading } = useApi<Hotel[] | undefined>("/api/hotels", {
    method: "GET",
  });
  const {
    data: recommendations,
    loading: recommendationLoading,
    refetch: recommendationRefetch,
  } = useApi<Recommendation | undefined>(
    `/api/recommendations/${user?._id}`,
    { method: "GET" },
    user ? true : false,
  );

  const navigate = useNavigate();
  if (loading) return <FullScreenLoader />;

  return (
    <>
      <Grid container sx={{ display: "flex" }}>
        <Grid
          item
          rowSpacing={5}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            display: "flex",
            flex: 3,
            flexWrap: "wrap",
            maxHeight: "100vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {data?.map((hotel) => (
            <Grid item key={hotel._id}>
              <HotelCard
                id={hotel._id}
                name={hotel.name}
                location={hotel.location}
                image={hotel.img}
                price={hotel.price || 30}
                rating={hotel.rating}
                user_rating={hotel.user_rating}
                visits={hotel.visits}
                bookings={hotel.bookings}
                onBook={() => {
                  if (user) {
                    setHotelId(hotel._id);
                    setOpen(true);
                  } else {
                    navigate("/signin");
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        {user &&
          recommendations?.recommended &&
          recommendations.recommended.length > 0 && (
            <>
              {recommendationLoading && <FullScreenLoader />}
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                container
                sx={{
                  justifyContent: "center",
                  flex: 2,
                  maxHeight: "100vh",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <h2>Recommended For You</h2>
                {recommendations?.recommended.map((hotel) => (
                  <Grid item key={hotel._id}>
                    <HotelCard
                      id={hotel._id}
                      name={hotel.name}
                      location={hotel.location}
                      image={hotel.img}
                      price={hotel.price || 30}
                      rating={hotel.rating}
                      user_rating={hotel.user_rating}
                      visits={hotel.visits}
                      bookings={hotel.bookings}
                      onBook={() => {
                        if (user) {
                          setHotelId(hotel._id);
                          setOpen(true);
                        } else {
                          navigate("/signin");
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
      </Grid>
      {open && (
        <DateRangePickerDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setHotelId(null);
          }}
          hotelId={hotelId || ""}
          userId={user?._id || ""}
          hotelRefetch={recommendationRefetch}
        />
      )}
    </>
  );
};

export default Main;
