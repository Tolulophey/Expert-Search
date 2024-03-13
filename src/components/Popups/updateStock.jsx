import React, { useState } from "react";
import PopUpModal from "../PopupModal";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  updateStockFailure,
  updateStockStart,
  updateStockSuccess,
} from "../../redux/product/productSlice";
import InputField from "../InputField";

const updateStockSchema = yup.object().shape({
  costPrice: yup.string().required("Cost price is required"),
  // highPrice: yup.string().required("High price is required"),
  // mediumPrice: yup.string().required("Medium price is required"),
  // lowPrice: yup.string().required("Low price is required"),
  quantity: yup.string().required("Quantity is required"),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, stock, theme) {
  return {
    fontWeight:
      stock.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function UpdateStock({ updateStockModal, handleClose }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, selectedRow } = useSelector((state) => state.stock);
  const methods = useForm({
    defaultValues: {
      costPrice: "",
      highPrice: "",
      lowPrice: "",
      mediumPrice: "",
      quantity: 1,
    },
    resolver: yupResolver(updateStockSchema),
  });

  const handleIncrement = () => {
    setValue("quantity", Number(quantity) + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setValue("quantity", Number(quantity) - 1);
    }
  };
  const token = currentUser.token;

  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

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

  const quantity = watch("quantity", 1);
  const costPrice = watch("costPrice", "");

  console.log(selectedRow);

  const onSubmit = async (data) => {
    try {
      dispatch(updateStockStart());
      let formattedData = {
        costPrice: data.costPrice,
        quantity: data.quantity,
      };

      if (selectedRow.listingType === "rental") {
        formattedData.sellingPrices = {
          highPrice: data.highPrice.toString(),
          lowPrice: data.lowPrice.toString(),
          mediumPrice: data.mediumPrice.toString(),
        };
      } else {
        formattedData.sellingPrice = data.sellingPrice;
      }
      const res = await axios.patch(
        `/admin/stocks/add/${selectedRow.stockId}`,
        formattedData,
        headerConfig
      );
      const new_data = res.data.data;
      dispatch(
        updateStockSuccess({
          photos: new_data?.photos,
          name: new_data?.name,
          category: new_data?.category,
          listingType: new_data?.listingType,
          stockings: new_data?.stockings,
          price:
            new_data.listingType === "sales"
              ? new_data.sellingPrice
              : new_data?.sellingPrices?.highPrice,
          description: new_data?.description,
          costPrice: new_data?.costPrice,
          sellingPrices: new_data?.sellingPrices,
          quantity: new_data?.quantity,
          stockId: new_data?._id,
        })
      );
      toast.success("stock added successfully!");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(updateStockFailure());
      handleClose();
    }
  };

  return (
    <div>
      <PopUpModal
        openPopUp={updateStockModal}
        handleClose={handleClose}
        borderRadius="15px"
        maxWidth="md"
        sx={{ pl: "68px", pr: "68px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="">
                <label className="mb-[15px] text-[12px] text-[#202020]">
                  Quantity to add to stock
                </label>
                <div className="flex border rounded-md justify-between items-center my-2 px-[25px] py-[20px]">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="mr-2"
                  >
                    -
                  </button>
                  <div className="flex items-center">
                    <input
                      type="text"
                      name="name"
                      {...register("quantity")}
                      className="outline-none text-[12px] text-center"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="ml-2"
                  >
                    +
                  </button>
                </div>

                <p className="text-[#912859] text-[12px] italic mt-[15px]">
                  Current quantity: {selectedRow.quantity}
                </p>
                <p className="text-[red] text-[12px] ">
                  {errors.quantity?.message}
                </p>
              </div>
              <div className="">
                <label className="mb-[15px] text-[12px] text-[#202020]">
                  Cost Price (1 quantity)
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("costPrice")}
                  placeholder="Enter the Cost Price"
                  className="outline-none px-[25px] py-[20px] my-2 border rounded-md text-[12px]"
                />
                <p className="text-[#912859] text-[12px] italic mt-[15px]">
                  Total Cost Price:{" "}
                  {costPrice ? costPrice * quantity : "Cost price * Quantity"}
                </p>
                <p className="text-[red] text-[12px] mb-[16px]">
                  {errors.costPrice?.message}
                </p>
              </div>
            </div>

            {selectedRow.listingType === "sales" && (
              <div className="grid grid-cols-1 md:grid-cols-2">
                <InputField
                  label={"Selling Price"}
                  type="text"
                  register={{ ...register("sellingPrice") }}
                  placeholder="Enter the selling price"
                />
              </div>
            )}

            {selectedRow.listingType === "rental" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-[16px]">
                <InputField
                  label={"High Price"}
                  type="number"
                  register={{ ...register("highPrice") }}
                  placeholder="₦350,000"
                  error={errors.highPrice?.message}
                />

                <InputField
                  label={"Medium Price"}
                  type="number"
                  placeholder="₦320,000"
                  register={{ ...register("mediumPrice") }}
                  error={errors.mediumPrice?.message}
                />

                <InputField
                  label={"Low Price"}
                  type="number"
                  placeholder="₦300,000"
                  register={{ ...register("lowPrice") }}
                  error={errors.lowPrice?.message}
                />
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-[16px] text-white bg-[#C29B06] h-[50px] mb-[52px] mt-[30px] w-[453px] rounded-md"
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "white" }} />
                ) : (
                  "Update Stock"
                )}
              </button>
            </div>
          </div>
        </form>
      </PopUpModal>
    </div>
  );
}

export default UpdateStock;
