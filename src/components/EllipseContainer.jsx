/* eslint-disable react/prop-types */
import { bigTwoCircle, bubbleDown, bubbleTop, logo } from "../assets";

const EllipseContainer = ({ title, children, welcome, height, profile }) => {
  return (
      <div className={`relative h-${height ? height : "screen"}  max-h-[100%] `}>
      <img
        src={bubbleDown}
        alt="bubble"
        className="hidden md:block absolute top-[0] left-[0]"
      />
      <img
        src={bubbleTop}
        alt="bubble"
        className="absolute md:right-0 md:scale-x-[1] transform scale-x-[-1] top-[0%] w-[50px] h-[50px] md:w-83px md:h-83px"
      />

      <img
        src={bubbleTop}
        alt="bubble"
        className="hidden md:block absolute top-[0] right-0"
      />
      <div className="absolute z-10 h-[420px] w-full max-md:top-[50%] max-md:translate-y-[-60%]  md:h-[720px] md:w-[720px] mx-auto left-0 right-0">
        <img src={bigTwoCircle} className="w-full object-contain h-full" />
      </div>

      <div className="flex  h-full z-50 relative pt-[60px] overflow-x-hidden overflow-y-scroll pb-[100px]">
        <div className="px-[20px] md:px-0 flex flex-col  w-[100%] md:w-[480px] md:mx-auto">
          {!welcome && (
            <>
              <div className="flex flex-col justify-center items-center">
                <img
                  src={logo}
                  alt="company-logo"
                  className="md:w-[300px] md:h-[148px] w-[226px] h-[112px] object-contain"
                />
              </div>

              <h3 className="text-[14px] text-black font-montserrat md:text-[24px] font-bold tracking-wider leading-normal text-center mt-[20px]">
                {title}
              </h3>
            </>
          )}
          <div className={`${welcome ? "pb-0 h-full" : "pb-[80px]"}`}>{children}</div>
        </div>
      </div>

      <img
        src={bubbleDown}
        alt="bubble"
        className="absolute bottom-0 right-0 md:w-[151px] md:h-[151px] w-[70px] h-[70px]"
      />
      <img
        src={bubbleTop}
        alt="bubble"
        className="hidden md:block absolute bottom-0 left-0"
      />
    </div>
  );
};

export default EllipseContainer;
