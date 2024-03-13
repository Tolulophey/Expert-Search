/* eslint-disable react/prop-types */
import { CircularProgress } from "@mui/material";

const PrimaryButton = ({onClick, type, title, loading, ...others }) => {
  return (
    <button
     onClick={onClick}
      type={type}
      className="w-full h-[40px] text-[12px] md:text-[16px] text-white md:h-[50px]  bg-[#C29B06] font-montserrat font-normal leading-normal tracking-wide py-2 px-4 rounded disabled:bg-gray-200 disabled:cursor-no-drop"
      {...others}
    >
      {loading ? (
        <CircularProgress size={26} sx={{ color: "white" }} />
      ) : (
        `${title}`
      )}
    </button>
  );
};

export default PrimaryButton;
