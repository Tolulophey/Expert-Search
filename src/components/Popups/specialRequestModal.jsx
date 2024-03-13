import React, { useState } from "react";
import PopUpModal from "../PopupModal";
import axios from "../../utils/axios";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { logo } from "../../assets";

const addStockSchema = yup.object().shape({});

function SpecialRequestModal({ specialRequestModal, handleClose }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isFormActive, setIsFormActive] = useState(false);
  const methods = useForm({
    defaultValues: {
      name: "",
      costPrice: "",
      highPrice: "",

    },
    resolver: yupResolver(addStockSchema),
  });

  const {
    reset,
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const headerConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${currentUser?.token}`,
    },
  };

  const handleYesClick = () => {
    setIsFormActive(true);
  };

  const photo = watch("photo", "");
  const size = watch("size", []);
  const color = watch("color", []);
  const quantity = watch("quantity", 1);

  const onSubmit = async (data) => {
    try {
      let formattedData = {
        name: data.name,
        costPrice: data.costPrice,
        sellingPrices: {
          highPrice: data.highPrice,
          lowPrice: data.lowPrice,
          mediumPrice: data.mediumPrice,
        },
        size: data.size,
        quantity: data.quantity,
        sizeGuard: data.sizeGuard,
        color: data.color,
        category: data.category,
        listingType: data.listingType,
        description: data.description,
      };
      console.log(formattedData);
      const form = new FormData();
      form.append("json", JSON.stringify(formattedData));
      form.append("files", photo);
      const res = await axios.post("/admin/stocks/add", form, headerConfig);
      console.log(res);
      toast.success("Stock added successfully!");
      // window.location.reload();
      // if (res) {
      //   reset();
      //   window.location.reload();
      // }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      console.log("Error submitting internship form", error);
    }
  };

  return (
    <div>
      <PopUpModal
        openPopUp={specialRequestModal}
        handleClose={handleClose}
        borderRadius="15px"
        maxWidth="md"
        sx={{ pl: "68px", pr: "68px", height: "auto" }}
      >
        <div className="flex flex-col items-center md:px-[128px] py-[40px] mx-auto justify-center">
          <div className="flex justify-center items-center w-[90px] h-[50px] md:w-[150px] md:h-[75px]">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="md:text-[16px] font-bold mt-[15px] mb-[25px]">
              Special Request
            </h3>
            <p className="md:text-[12px] md:text-[#202020]">
              Do you have special request for this product?
            </p>
          </div>
          <div className="flex w-full mt-[45px] justify-between">
            <button
              className={`rounded-md px-[30px] py-[10px] md:text-[16px] border 1px solid border-[#F81616] ${
                isFormActive ? "" : "inactiveButton"
              }`}
              onClick={() => {
                setIsFormActive(false);
                handleClose();
              }}
            >
              No, I don’t
            </button>
            <button
              className={`rounded-md px-[30px] py-[10px] md:text-[16px] text-white bg-[#C29B06] ${
                isFormActive ? "" : "inactiveButton"
              }`}
              onClick={() => {
                setIsFormActive(true);
                // Reset form state when "Yes" button is clicked
                reset();
              }}
            >
              Yes, I do
            </button>
          </div>
          <div className="w-[100%]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                name="requirement"
                id=""
                cols="50"
                rows="10"
                placeholder="Type your requirements here..."
                className={`w-[100%] mt-[45px] border border-1px p-[10px] border-[#A3A3A3] text-[#A3A3A3] outline-none ${
                  !isFormActive ? "" : "border-black text-black"
                }`}
                disabled={!isFormActive}
                // disabled={!isFormActive}
                // className=" w-[100%] mt-[45px] border border-1px p-[10px] border-[#A3A3A3] outline-none"
              >
              </textarea>
              <button
                className={`w-[100%] md:mt-[31px] rounded-md px-[30px] py-[10px] md:text-[16px] text-white bg-[#C29B06] ${
                  isFormActive ? "" : "bg-[#A3A3A3] border-black"
                }`}
                disabled={!isFormActive}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </PopUpModal>
    </div>
  );
}

export default SpecialRequestModal;
