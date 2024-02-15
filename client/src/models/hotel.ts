import { BookingBody } from "./booking";

export default interface Hotel {
  createdAt: string;
  updatedAt: string;
  name: string;
  img: string;
  rating: number;
  location: string;
  bookings: BookingBody[];
  user_rating?: number | undefined;
  visits?: number | undefined;
  price: number;
  _id: string;
}
