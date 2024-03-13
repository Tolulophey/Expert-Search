/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function InputField({
  label,
  required,
  placeholder,
  bgColor,
  error,
  register,
  labelNewClasses,
  ...other
}) {
  return ( 
    <div>
      <label className={`text-[12px] md:text-[16px] ${labelNewClasses}`}>
        {label}
        <span className="text-red-600">{required && "*"}</span>
      </label>
      <input
        {...register}
        placeholder={placeholder}
        className={`w-full outline-none text-[12px] py-[10px] sm:py-[12px] px-[15px]  md:text-[14px]  rounded-md border border-gray-700  my-[8px] ${bgColor}`}
        {...other}
      />
      {error && <p className="text-[red] text[10px]">{error}</p>}
    </div>
  );
}

export default InputField;
