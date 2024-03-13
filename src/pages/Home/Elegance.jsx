import React, { useState, useEffect } from "react";

function Elegance({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      const newIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(newIndex);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [currentImageIndex, images.length]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className="w-full flex flex-col lg:flex-row pt-[38px] md:pt-[80px] px-[20px] md:pl-[30px] pb-[38px] md:pb-[162px] ">
      <div className="w-[100%] lg:w-[50%]">
        <div className="h-[156px] md:h-[500px] w-full">
          <iframe
            // width="560"
            // height="315"
            className="h-[100%] object-cover w-[100%]"
            src="https://www.youtube.com/embed/9-ZO7om8TJw?si=qL1tFRztztyXcL1s"
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex}`}
            className="w-[184px] h-[156px] md:w-[687px] object-cover md:h-[300px]"
          /> */}
        </div>
      </div>
      <div className="flex p-[20px] box-border flex-col max-lg:mt-5 justify-center items-center w-full lg:w-[50%]">
        <h3 className="text-center text-black text-[12px] text-shadow font-montserrat font-bold md:text-[30px] w-[100%]">
          “Dress your dreams in elegance with Tees Bridal.”
        </h3>
        <p className="text-[8px] p-[10px] md:p-[20px] md:text-[16px]">
          Beautiful and affordable wedding dresses and accessories available for
          sale and rental.
        </p>
      </div>
    </div>
  );
}

export default Elegance;
