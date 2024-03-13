import React from "react";
import { Link } from "react-router-dom";
import { Copyright, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const { chosenCountry } = useSelector((state) => state.location);
  return (
    // <div className="bg-[#C59B60] py-[20px] md:py-[40px] px-[20px] md:px-[50px] lg:px-[100px]">
    //   <div className="flex  max-md:flex-col justify-between items-center">
    //     <div className="">
    //       <img
    //         src={logo}
    //         alt="logo"
    //         className="w-[80px] h-[80px] object-contain md:w-full md:h-[145px] cursor-pointer"
    //       />
    //     </div>
    //     <div className="max-sm:w-full grow  flex  flex-wrap  md:flex-row items-center gap-3 justify-center md:justify-around">
    //       <div className="flex flex-row  items-center  md:gap-5">
    //         <Link to="/contact">
    //           <li className="cursor-pointer text-white  md:ml-0 font-montserrat md:text-[24px] text-[14px] font-normal leading-normal tracking-wide">
    //             Contact Us
    //           </li>
    //         </Link>
    //         <Link to="/faq">
    //           <li className="cursor-pointer text-white ml-[10px] md:ml-0 font-montserrat md:text-[24px] text-[14px] font-normal leading-normal tracking-wide">
    //             FAQs
    //           </li>
    //         </Link>
    //         <li className="cursor-pointer text-white ml-[10px] md:ml-0 font-montserrat md:text-[24px] text-[14px] font-normal leading-normal tracking-wide">
    //           Privacy Policy
    //         </li>
    //         <Link to="/return-policy">
    //           <li className="cursor-pointer text-white ml-[10px] md:ml-0 font-montserrat md:text-[24px] text-[14px] font-normal leading-normal tracking-wide">
    //             Return Policy
    //           </li>
    //         </Link>
    //       </div>

    //       <div className="flex flex-row gap-3 md:gap-[50px]">
    //         <a
    //           href="https://www.tiktok.com/@lizzykwin?_t=8jYS4qiFs5l&_r=1"
    //           className="cursor-pointer"
    //         >
    //           <TiktokLogo size={20} weight="bold" color="white" />
    //         </a>
    //         <a
    //           href="https://www.instagram.com/tees_bridals?igsh=dzhwNmc3NzV5czIw&utm_source=qr"
    //           className="cursor-pointer"
    //         >
    //           <InstagramLogo size={20} weight="bold" color="white" />
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    //   <p className="max-sm:text-[10px] text-white text-center max-md:mt-5">
    //     Copyright{" "}
    //     <span>
    //       {" "}
    //       <Copyright
    //         style={{ display: "inline-block" }}
    //         size={14}
    //         color="white"
    //       />{" "}
    //     </span>{" "}
    //     {year} Teesbridal. All Rights Reserved
    //   </p>
    // </div>
    <div className="bg-[#C59B60] text-white py-[20px] md:py-[40px] px-[20px] md:px-[50px] lg:px-[100px]">
      <div>
        <p>
          <span>Country: </span>
          <span>{chosenCountry?.name}</span>
        </p>
        <p>
          <span>Postal code: </span>
          <span>{chosenCountry?.postalCode}</span>
        </p>
        <p>
          <span>Location: </span>
          <span>{chosenCountry?.location}</span>
        </p>
      </div>
      <div>
        <p className="max-sm:text-[10px] text-white text-center max-md:mt-5">
          Copyright {""}
          <span>
            <Copyright
              style={{ display: "inline-block" }}
              size={14}
              color="white"
            />
          </span>{" "}
          {""}
          {year} Expert Contractor Search. All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
