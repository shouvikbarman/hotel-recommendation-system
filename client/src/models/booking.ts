export enum BookingStatus {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
}
export interface BookingBody {
  booking_from: string;
  booking_to: string;
  number_of_guests?: number;
  user: string;
  hotel: string;
  status: BookingStatus;
}
