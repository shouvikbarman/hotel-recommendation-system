import Hotel from "./hotel";

export interface Recommendation {
  _id: string;
  recommended: Hotel[];
}
