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
      <div>
        <StarsRating
          size={30}
          starRatedColor={"red"}
          rating={average}
          isSelectable={true}
          editing={false}
        //   starDimension="30px"
        //   starSpacing="20px"
        />
        <span className="text px-3 h4 ">
       ( {ratinglength} )
       </span>
      </div>
    );
  }
};
