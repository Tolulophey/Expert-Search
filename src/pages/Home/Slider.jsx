/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const Slider = ({ images }) => {
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

  const getPosition = (index) => {
    switch (index) {
      case 4:
        return "50% 50%";
      case 2:
        return "50% 10%";
      default:
        return "50% 25%";
    }
  };
  // "50% 25%"
  const containerStyle = {
    backgroundImage: `url(${images[currentImageIndex].value})`,
    backgroundPosition: getPosition(currentImageIndex),
    backgroundSize: "cover",
  };

  return (
    <div className="relative ">
      <div className="h-[400px]  md:h-[800px]" style={containerStyle}></div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`md:w-4 h-4 mx-2 rounded-full cursor-pointer ${
              index === currentImageIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
