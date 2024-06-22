import React from "react";

const Product = ({ imageUrl, imageAlt }) => {
  return (
    <img
      src={imageUrl}
      alt={imageAlt}
      className=" hover:scale-110 rounded-lg   "
    />
  );
};
export default Product;
