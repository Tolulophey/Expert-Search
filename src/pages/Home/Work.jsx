import React from "react";
import { edit, hanger, payment, shopping } from "../../assets";

const Work = () => {
  return (
    <>
      <div className="w-full  bg-white px-[20px] md:px-[56px] pt-[20px] md:pt-[35px] pb-[50px] md:pb-[150px] ">
        <h1 className="text-[14px] text-center  text-black pb-[20px] md:pb-[44px] md:text-[30px]">
          How Tees Bridal Rental Works
        </h1>
        <div className="grid grid-cols-2  justify-center md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col w-[160px] md:w-[260px] justify-center items-center px-[10px]">
            <img src={hanger} alt="hanger-logo" className="w-[24px] h-[24px] md:w-[60px] md:h-[60px]" />
            <p className="text-[#202020] text-center text-[12px] md:text-18px font-extrabold tracking-tighter px-[10px] md:pt-[15px] md:pb-[20px]">
              Select item
            </p>
            <p className="text-[8px] text-center md:text-[14px] text-[#202020] leading-5">
              Go to rentals page, choose an item from our collections of
              designer outfits and accessories.
            </p>
          </div>
          <div className="flex flex-col w-[160px] md:w-[260px] justify-center items-center px-[10px]">
            <img src={edit} alt="edit-logo" className="md:w-[60px] md:h-[60px] w-[24px] h-[24px]" />
            <p className="text-[#202020] text-center text-[12px] md:text-18px font-extrabold tracking-tighter px-[10px] md:pt-[15px] md:pb-[20px]">
              Fill in the details
            </p>
            <p className="text-[8px] text-center md:text-[14px] text-[#202020] leading-5">
              Input the required details to select date of rental, payment type,
              delivery type and return date.
            </p>
          </div>
          <div className="flex flex-col w-[160px] md:w-[260px] justify-center items-center px-[10px] md:mt-[0px] mt-[48px]">
            <img
              src={shopping}
              alt="hanger-logo"
              className="md:w-[60px] md:h-[60px] w-[24px] h-[24px]"
            />
            <p className="text-[#202020] text-center text-[12px] md:text-18px font-extrabold tracking-tighter px-[10px] md:pt-[15px] md:pb-[20px]">
              Add to Rental Cart
            </p>
            <p className="text-[8px] text-center md:text-[14px] text-[#202020] leading-5">
              Proceed to add the chosen items of your choice to cart.
            </p>
          </div>
          <div className="flex flex-col w-[160px] md:w-[260px] justify-center items-center md:mt-0 mt-[48px] px-[10px]">
            <img
              src={payment}
              alt="payment-logo"
              className="md:w-[60px] text-center md:h-[60px] w-[24px] h-[24px]"
            />
            <p className="text-[#202020] text-center text-[12px] md:text-18px font-extrabold tracking-tighter px-[10px] md:pt-[15px] md:pb-[20px]">
              Proceed to Payment
            </p>
            <p className="text-[8px] text-center md:text-[14px] text-[#202020] leading-5">
              Confirm the selected items and details are correct, then proceed
              to make payment and your goods will be delivered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
