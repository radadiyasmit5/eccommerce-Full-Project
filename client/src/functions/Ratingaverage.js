import React from "react";
import StarsRating from "react-star-ratings";
export const Ratingaverage = (product) => {
  if (product && product.ratings) {
    const ratingsarray = product && product.ratings;
    const total = [];
    const ratinglength = ratingsarray.length;

    const totalofstars = ratingsarray.reduce((p, n) => {
      return p + n.star;
    }, 0);
    const average = totalofstars / ratinglength;

    return (
      <div className="text-center pt-1 pb-3">
        <span >
          <StarsRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor={"red"}
            rating={average}
            isSelectable={true}
            editing={false}
          //   starDimension="30px"
          //   starSpacing="20px"
          />{" "}

          ( {ratinglength} )
        </span>
      </div>
    );
  }
};
