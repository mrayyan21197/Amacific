import React from "react";
import { handleProductImageError } from "../../utils/productImageFallback";

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt="" onError={handleProductImageError} />;
};

export default Image;
