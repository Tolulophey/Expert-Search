/* eslint-disable react/prop-types */

import { IconButton } from "@mui/material";
import { shopping } from "../assets";

const ProductCard = ({
  item,
  handleClick,
  handleImageClick,
  handleAddToCart,
}) => {
  const containerStyle = {
    backgroundImage: `url(${item?.photos[0]})`,
    backgroundSize: "cover",
  };

  return (
    <div className="flex flex-col">
      <div
        className="h-[200px] sm:-[300px] md:h-[400px]  bg-gray-300 bg-no-repeat  cursor-pointer"
        style={containerStyle}
        onClick={handleClick}
      ></div>
      <p
        className="text-[10px] mt-[15px] md:mt-0 md:text-[20px] cursor-pointer"
        onClick={handleClick}
      >
        {item?.name}
      </p>
      <div className="flex justify-between items-center mt-[6px]">
        <div className="">
          <p className="text-[10px] text-[#912859]  md:text-[20px]">
            Price:<span className="font-bold"> ₦{item?.price}</span>
          </p>
        </div>
        <IconButton
          onClick={handleAddToCart}
          sx={{
            width: "max-content",
            padding: 0,
            borderRadius: 0,
          }}
        >
          <div className="flex items-center">
            <p className="text-[10px] md:text-[10px] mr-[5px]">Add to cart</p>
            <img
              src={shopping}
              alt="shopping-logo"
              className="w-[14px] h-[14px]"
            />
          </div>
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCard;
