const getHowGoodRating = (rating: number): string => {
  if (rating < 1 || rating > 10) {
    throw new Error("Rating must be between 1 and 10");
  }

  if (rating >= 1 && rating <= 3) {
    return "Not good at all";
  } else if (rating > 3 && rating <= 5) {
    return "Not so good";
  } else if (rating > 5 && rating <= 7) {
    return "Good";
  } else if (rating > 7 && rating <= 9) {
    return "Very good";
  } else {
    return "Excellent";
  }
};

export default getHowGoodRating;
