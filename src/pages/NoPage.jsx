import React from "react";
import { useNavigate } from "react-router-dom";

function NoPage() {

  const navigate = useNavigate()
  const handleClick = ()=> navigate(-1)

  return (
    <div className="h-[100%] flex justify-center items-center">
      <div className="flex flex-col items-center mb-20 mt-20 text-[40px]">
        <h1>PAGE NOT FOUND</h1>
        <h2>
          Go{" "}
          <span onClick={handleClick} className="underline cursor-pointer">
            back
          </span>
        </h2>
      </div>
    </div>
  );
}

export default NoPage;
