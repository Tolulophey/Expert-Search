import React, { useEffect, useRef, useState } from "react";
import PopUpModal from "../PopupModal";
import axios from "../../utils/axios";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import {
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Datepicker from "../Datepicker";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { updateRentalTracking } from "../../redux/transaction/transactionSlice";

const updateSalesStatus = yup.object().shape({
  name: yup.string(),
  product_id: yup.string(),
  color: yup.string(),
  quantity: yup.string(),
  size: yup.string(),
  salesMode: yup.string(),
  deliveryMode: yup.string(),
  sellingPrice: yup.string(),
  address: yup.string(),
  pickDate: yup.date(),
  returnDate: yup.date(),
  status: yup.string(),
});



function RentalTrack({ selected, showDetails, general, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [pickDate, setPickDate] = useState(selected.pickDate);
  const [returnDate, setReturnDate] = useState(selected.returnDate);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const methods = useForm({
    defaultValues: {
      product_id: selected.product.product_id,
      name: selected.product.name,
      color: selected.color,
      quantity: selected.quantity,
      size: selected.size,
      salesMode: general.salesMode,
      deliveryMode: general.deliveryMode,
      sellingPrice: selected.sellingPrice,
      address: general.address ? general.address : "Nil",
      status: selected.status,
    },
    resolver: yupResolver(updateSalesStatus),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const status = ["confirmed", "processing", "delivered"];
  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // console.log("data: ",data)
    try {
      let formData = {
        pickDate: pickDate,
        returnDate: returnDate,
        status: data.status,
      };
      const res = await axios.patch(
        `/transactions/sales/${selected._id}`,
        formData,
        headerConfig
      );
      toast.success("Sales updated successfully!");
      const new_data = res.data.data;
      dispatch(updateRentalTracking({
        transaction_id: general._id,
        sales: new_data
      }));
      handleClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <PopUpModal
        openPopUp={showDetails}
        handleClose={handleClose}
        borderRadius="15px"
        maxWidth="md"
        sx={{ pl: "68px", pr: "68px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-[16px]">
              <InputField
                label={"Name of Product"}
                type="text"
                register={{ ...register("name") }}
                readOnly
                error={errors.name?.message}
              />
              <InputField
                label={"Product ID"}
                type="text"
                register={{ ...register("product_id") }}
                readOnly
                error={errors.productCode?.message}
              />
              <InputField
                label={"Selling price"}
                type="text"
                register={{ ...register("sellingPrice") }}
                error={errors.costPrice?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-[16px]">
              <InputField
                label={"Color"}
                type="text"
                register={{ ...register("color") }}
                readOnly
                error={errors.name?.message}
              />
              <InputField
                label={"Quantity"}
                type="text"
                register={{ ...register("quantity") }}
                readOnly
                error={errors.productCode?.message}
              />
              <InputField
                label={"Size"}
                type="text"
                register={{ ...register("size") }}
                error={errors.costPrice?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-[16px]">
              <InputField
                label={"Sales Mode"}
                type="text"
                register={{ ...register("salesMode") }}
                readOnly
                error={errors.name?.message}
              />
              <InputField
                label={"Delivery Mode"}
                type="text"
                register={{ ...register("deliveryMode") }}
                readOnly
                error={errors.productCode?.message}
              />
              <InputField
                label={"Address"}
                type="text"
                register={{ ...register("address") }}
                error={errors.costPrice?.message}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-[16px]">
              <div>
                <label className="mb-[15px] text-[12px] text-[#202020]">
                  Pick up date
                </label>
                <Datepicker
                  date={pickDate}
                  // {...register("pickDate")}
                  onChange={(date) => setPickDate(date)}
                />
                <p className="text-[red] text-[12px]  mb-[10px]">
                  {errors.pickDate?.message}
                </p>
              </div>
              <div>
                <label className="mb-[15px] text-[12px] text-[#202020]">
                  Return date
                </label>
                <div className="w-full">
                  <Datepicker
                    date={returnDate}
                    // {...register("returnDate")}
                    onChange={(date) => setReturnDate(date)}
                  />
                </div>
                <p className="text-[red] text-[12px]  mb-[10px]">
                  {errors.returnDate?.message}
                </p>
              </div>
              <SelectField
                label={"Status"}
                // value={selected.status}
                {...register("status")}
                // placeholder="select status"
                my={0}
                error={errors.status?.message}
              >
                {status.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectField>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-[16px] text-white bg-[#C29B06] h-[50px] my-[50px] w-[453px] rounded-md"
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "white" }} />
                ) : (
                  "Update Sales"
                )}
              </button>
            </div>
          </div>
        </form>
      </PopUpModal>
    </div>
  );
}

export default RentalTrack;
