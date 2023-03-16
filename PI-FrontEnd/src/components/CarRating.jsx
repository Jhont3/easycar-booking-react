import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

export const CarRating = ({displayNumber}) => {
  const [rating, setRating] = useState(0);

  function getRating(rating) {
    switch (rating) {
      case 1:
        return "Bad";
      case 2:
        return "Could be better";
      case 3:
        return "Good";
      case 4:
        return "Great";
      case 5:
        return "Excellent";
      default:
        return "No rating";
    }
  }
  return (
    <>
      <div style={{ maxWidth: 126, width: "100%", textAlign: "center" }}>
        <div>{`${getRating(rating)}`}</div>
        <Rating value={rating} onChange={setRating} />
      </div>
      <span
        style={{
          backgroundColor: "#a4161a",
          padding: "0.7rem",
          borderRadius: "1rem",
          marginLeft: "1rem",
          color: "white",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        }}
        className={displayNumber && 'displayNumber'}
      >
        {rating}
      </span>
    </>
  );
};
