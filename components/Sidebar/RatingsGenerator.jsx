import React from "react";
import { Rating } from "flowbite-react";

export default function RatingsGenerator() {
  const Ratings = [];

  for (let i = 1; i <= 5; i++) {
    const filledStars = 5 - i;
    const emptyStars = i;

    const stars = [];
    for (let j = 0; j < emptyStars; j++) {
      stars.push(<Rating.Star key={`empty_${j}`} />);
    }
    for (let j = 0; j < filledStars; j++) {
      stars.push(<Rating.Star key={`filled_${j}`} filled={false} />);
    }
    Ratings.push({
      id: `${i}`,
      value: `${i}`,
      text: <Rating>{stars} & above</Rating>,
    });
  }

  return Ratings;
}
