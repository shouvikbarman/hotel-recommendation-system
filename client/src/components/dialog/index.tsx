import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CloseIcon from "@mui/icons-material/Close";
import { BookingBody } from "../../models/booking";
import useLazyApi from "../../hooks/useLazyApi";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  hotelId: string;
  userId: string;
  hotelRefetch?: () => void;
}

interface FormData {
  fromDate: string;
  toDate: string;
  status: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  open,
  onClose,
  hotelId,
  userId,
  hotelRefetch,
}) => {
  const { fetchData } = useLazyApi<BookingBody | undefined>();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fromDate: "",
      toDate: "",
      status: "DRAFT",
    },
  });

  const handleComplete = () => {
    setValue("status", "COMPLETED");
    handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    await fetchData("/api/bookings", {
      method: "POST",
      data: {
        booking_from: data.fromDate,
        booking_to: data.toDate,
        hotel: hotelId,
        user: userId,
        status: data.status,
      },
    });
    if (data && hotelRefetch) {
      // refetch recommendations list
      hotelRefetch();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Booking</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={2}>
            <Grid item md={6}>
              <Controller
                name="fromDate"
                control={control}
                defaultValue=""
                rules={{ required: "From date is required" }}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    label="From Date"
                    type="date"
                    fullWidth
                    error={Boolean(errors.fromDate)}
                    helperText={errors.fromDate && errors.fromDate.message}
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                name="toDate"
                control={control}
                defaultValue=""
                rules={{
                  required: "To date is required",
                  validate: (value: any) => {
                    const fromDate = getValues("fromDate");
                    return (
                      fromDate <= value || "To date must be after From date"
                    );
                  },
                }}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    label="To Date"
                    type="date"
                    fullWidth
                    error={Boolean(errors.toDate)}
                    helperText={errors.toDate && errors.toDate.message}
                  />
                )}
              />
            </Grid>
            <input type="hidden" name="status" defaultValue="DRAFT" />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <Button type="submit">Save</Button>
            <Button onClick={handleComplete} startIcon={<DateRangeIcon />}>
              Confirm Booking
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookingDialog;
