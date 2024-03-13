import React from "react";

function Content() {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center pt-[25px] pb-[25px] md:pt-[80px] md:pb-[45px] bg-cover bg-center "
        style={{ backgroundImage: "url('/assets/Mask group (1).jpg')" }}
      >
        <h4 className="text-[12px] md:text-[30px] text-white">
          The expert Contractor Search
        </h4>
        <p className="mt-[10px] md:mt-[20px] mb-[20px]  md:mb-[30px] text-[10px] md:text-[24px] tracking-wide font-montserrat leading-normal text-white">
          The best hub for all expert Contractors in town
        </p>
        <button className="w-[100px] h-[25px] md:w-[216px] md:h-[50px] text-[10px] md:text-[16px] text-white flex-shrink-0 rounded-md border border-white">
          Read Now
        </button>
      </div>
    </>
  );
}

export default Content;
