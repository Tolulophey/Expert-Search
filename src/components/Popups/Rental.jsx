/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
import AdminPaymentModal from "./adminPaymentModal";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { IconButton } from "@mui/material";
import { CurrencyNgn, NotePencil, Trash } from "@phosphor-icons/react";
import Datepicker from "../Datepicker";
import ReactDatePicker from "react-datepicker";
import InputField from "../InputField";

const createRentalSchema = yup.object().shape({
  modeOfPayment: yup.string().required("Mode of Payment is required"),
  customerName: yup.string().required("Customer Name is required"),
  customerEmail: yup.string().required("Customer Email is required"),
  customerPhone: yup.string().required("Customer phone number is required"),
});

function Rental({ currentUser }) {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const getStocks = async () => {
      try {
        const { data } = await axios.get("/admin/stocks?type=rental", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        const fectchProduct = data.data;
        console.log(fectchProduct);
        setProducts(fectchProduct);
      } catch (error) {
        console.log(error);
      }
    };

    getStocks();
  }, [currentUser]);

  const methods = useForm({
    defaultValues: {
      productId: "",
      color: "",
      size: "",
      highPrice: "",
      lowPrice: "",
      mediumPrice: "",
      rentingPrice: "",
      quantity: 1,
      modeOfPayment: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    },
    resolver: yupResolver(createRentalSchema),
  });

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = methods;

  const productId = watch("productId", "");
  const quantity = watch("quantity", 1);
  const rentingPrice = watch("rentingPrice", 0);
  const color = watch("color", "");
  const size = watch("size", "");
  const rentalDuration = watch("rentalDuration", "");

  const handleIncrement = () => {
    setValue("quantity", quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setValue("quantity", quantity - 1);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formattedData = {
      productType: "rental",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      salesMode: "in house",
      paymentMethod: "bank",
      cart: [
        ...carts.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          sellingPrice: Number(item.rentingPrice),
          color: item.color,
          size: item.size,
          rentalDuration: rentalDuration,
          startDate: startDate,
          endDate: endDate,
        })),
      ],
    };

    const headerConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    try {
      const form = new FormData();

      form.append("json", JSON.stringify(formattedData));

      const res = await axios.post("/transactions/add", form, headerConfig);

      toast.success("Sales added successfully");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const openPaymentModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const product = products.find((el) => el._id === selectedOption?.value);
    setSelectedProduct(product);
    if (product) {
      setValue("productId", product?.product_id);
      setValue("highPrice", product?.sellingPrices?.highPrice);
      setValue("mediumPrice", product?.sellingPrices?.mediumPrice);
      setValue("lowPrice", product?.sellingPrices?.lowPrice);
    }
  }, [selectedOption]);

  const generateError = (name, msg) => {
    setError(name, {
      type: "manual",
      message: msg,
    });
    setTimeout(() => {
      setError(name, {
        type: "manual",
        message: null,
      });
    }, 3000);
  };
  const handleCart = () => {
    if (!productId) {
      toast.error("Select a product to add");
      return;
    }

    // if (color.trim() === "" || !color) {
    //   generateError("color", "Select product color");
    //   return;
    // }

    // if (size.trim() === "" || !size) {
    //   generateError("size", "Select product size");
    //   return;
    // }
    if (rentingPrice < 1) {
      generateError("rentingPrice", "Renting Price is required");
      return;
    }

    // if (quantity > selectedProduct.quantityTracking.remaining) {
    //   toast.error(
    //     `The selected quantity exceeds the available stock for this product. Please choose a quantity that is equal to or less than the remaining stock.`
    //   );
    //   return;
    // }

    const findIndex = carts.findIndex((el) => el._id === selectedProduct._id);

    const productData = {
      _id: selectedProduct._id,
      quantity: quantity,
      rentingPrice: rentingPrice,
      img: selectedProduct?.photos[0],
      productName: selectedProduct?.name,
      color: color,
      size: size,
      rentalDuration: rentalDuration,
      startDate: startDate,
      endDate: endDate,
    };

    if (findIndex !== -1) {
      carts[findIndex] = productData;
      setValue("rentingPrice", "");
    } else {
      setCarts([...carts, productData]);
      setValue("rentingPrice", "");
    }
  };

  const handleRemoveItem = (id) => {
    const updatedList = carts.filter((el) => el._id !== id);
    setCarts(updatedList);
  };

  const handleEditItem = (item) => {
    setSelectedOption({
      value: item._id,
      label: item.productName,
    });
    setValue("rentingPrice", item.rentingPrice);
    setValue("quantity", item.quantity);
  };

  const calculateTotalAmount = (item) => {
    return Number(item.quantity) * Number(item.rentingPrice);
  };
  const totalAmount = carts.reduce(
    (acc, item) => acc + calculateTotalAmount(item),
    0
  );

  console.log(carts);

  return (
    <div className="bg-white mx-[20px] flex flex-col justify-between px-[30px] pt-[50px] mt-[45px] pb-[40px] mb-[25px]">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[50%]">
          <div className="flex justify-between items-center mb-[32px]">
            <p className="text-[#202020] text-[12px] font-bold">
              Tees Bridal Orders
            </p>
            <button
              onClick={handleCart}
              className="border border-1px border-[#C29B06] text-[16px] p-[10px] rounded-md"
            >
              Add +
            </button>
          </div>
          <div className="flex flex-col">
            <form>
              <div className="flex flex-col mb-[16px]">
                <p className="text-[12px] text-[#202020] mb-[8px]">
                  Product Name
                </p>
                <Select
                  styles={{
                    borderRadius: "0.375rem",
                  }}
                  options={products?.map((el) => ({
                    value: el._id,
                    label: el.name,
                  }))}
                  isSearchable
                  placeholder="Enter the product’s name"
                  value={selectedOption}
                  onChange={(item) => {
                    setSelectedOption(item);
                    setSelectedColor(null);
                    setSelectedSize(null);
                  }}
                />
                <p className="text-[red] text-[12px]">{errors.name?.message}</p>
              </div>

              <InputField
                label={"Product ID"}
                type="text"
                placeholder="XGY564D"
                register={{ ...register("productId") }}
                readOnly
              />

              <div className="grid grid-cols-3 gap-4 mb-[16px]">
                <InputField
                  label={"High Price"}
                  type="number"
                  placeholder="₦350,000"
                  register={{ ...register("highPrice") }}
                  readOnly
                />

                <InputField
                  label={"Medium Price"}
                  type="number"
                  placeholder="₦320,000"
                  register={{ ...register("mediumPrice") }}
                  readOnly
                />

                <InputField
                  label={"Low Price"}
                  type="number"
                  placeholder="₦300,000"
                  register={{ ...register("lowPrice") }}
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-[16px]">
                {selectedProduct?.color.length >= 1 && (
                  <div>
                    <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                      Product Color
                    </p>
                    <Select
                      styles={{
                        borderRadius: "0.375rem",
                      }}
                      options={selectedProduct?.color?.map((el) => ({
                        value: el,
                        label: el,
                      }))}
                      isSearchable
                      placeholder="Select Color"
                      value={selectedColor}
                      onChange={(item) => {
                        setSelectedColor(item);
                        setValue("color", item.value);
                      }}
                    />
                    <p className="text-[red] text-[12px]">
                      {errors.color?.message}
                    </p>
                  </div>
                )}
                {selectedProduct?.size.length >= 1 && (
                  <div className="flex flex-col">
                    <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                      Product Size
                    </p>
                    <Select
                      styles={{
                        borderRadius: "0.375rem",
                      }}
                      options={selectedProduct?.size?.map((el) => ({
                        value: el,
                        label: el,
                      }))}
                      isSearchable
                      placeholder="Select Color"
                      value={selectedSize}
                      onChange={(item) => {
                        setSelectedSize(item);
                        setValue("size", item.value);
                      }}
                    />
                    <p className="text-[red] text-[12px]">
                      {errors.size?.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between w-full mb-[16px]">
                <div>
                  <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                    Renting Price
                  </p>
                  <input
                    {...register("rentingPrice")}
                    type="text"
                    placeholder="Enter the renting price"
                    className="px-[25px] py-[12px] border  rounded-md text-[12px] outline-none"
                  />
                  <p className="text-[red] text-[12px]">
                    {errors.rentingPrice?.message}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                    Quantity
                  </p>
                  <div className="flex border rounded-md justify-between items-center px-[20px]">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="mr-2"
                    >
                      -
                    </button>
                    <div className="flex items-center">
                      <input
                        type="number"
                        {...register("quantity")}
                        className="outline-none text-[12px] py-[12px] text-center"
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
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-[16px]">
                {/* <div className="flex-grow-1  flex flex-col">
                  <p className="text-[12px] text-[#202020] mb-[8px]">
                    Rent Duration (Days)
                  </p>
                  <input
                    {...register("rentalDuration")}
                    contentEditable={false}
                    type="number"
                    placeholder="₦350,000"
                    className="px-[25px] py-[12px] border  rounded-md text-[12px] outline-none"
                  />
                </div> */}
                <div className="flex-grow-1 flex flex-col">
                  <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                    Pick up date
                  </p>
                  <Datepicker
                    date={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="flex-grow-1 flex   flex-col">
                  <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                    Return date
                  </p>
                  <div className="w-full">
                    <Datepicker
                      date={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="border-b mt-[16px]"></div>
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="flex flex-col mb-[16px]">
                <p className="text-[14px] md:text-[16px] text-[#202020] mb-[8px]">
                  Mode of Payment
                </p>
                <select
                  {...register("modeOfPayment")}
                  className="border  border-gray-200 px-[25px] py-[12px] rounded-md w-full  outline-none"
                >
                  <option value="" className="text-[10px]" disabled selected>
                    Enter the payment method
                  </option>
                  <option value="Cash Transfer">Cash Transfer</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Via Card">Via Card</option>
                </select>
                <p className="text-[red] text-[12px]">
                  {errors.modeOfPayment?.message}
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-[16px]">
              <InputField
                label={"Customer Name"}
                required={true}
                type="text"
                placeholder="Mr. Adewale Olufemi"
                register={{ ...register("customerName") }}
                error={errors.customerName?.message}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[16px]">
                <InputField
                  label={"Customer Email Address"}
                  type="email"
                  placeholder="adewale.olufemi1@gmail.com"
                  register={{ ...register("customerEmail") }}
                  error={errors.customerEmail?.message}
                />
                <InputField
                  label={"Customer Phone Number"}
                  type="text"
                  required={true}
                  placeholder="080565957445"
                  register={{ ...register("customerPhone") }}
                  error={errors.customerPhone?.message}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[36%]">
          {carts.length >= 1 ? (
            carts.map((item) => (
              <CartCard
                key={item._id}
                title={item.productName}
                quantity={item.quantity}
                img={item.img}
                color={item.color}
                size={item.size}
                price={Number(item.quantity) * Number(item.rentingPrice)}
                onDelete={() => handleRemoveItem(item._id)}
                onEdit={() => handleEditItem(item)}
              />
            ))
          ) : (
            <div>
              <p className="text-center  text-2xl font-bold">
                Your cart is empty
              </p>
              <p className="text-center  text-lg ">Add products</p>
            </div>
          )}
          <div className="border-b mt-[16px]"></div>

          <div className="flex flex-col">
            <p className="text-[20px] font-bold">Order Summary</p>
            <p className="text-[16px] my-[15px]">
              Sub-Total: ₦{totalAmount.toLocaleString()}
            </p>
            <p className="text-[16px]">VAT: ₦0</p>
          </div>
          <div className="border-b my-[26px]"></div>
          <p className="text-[16px] mb-[43px]">
            Total: ₦{totalAmount.toLocaleString()}
          </p>
          <button
            disabled={carts.length < 1}
            className="text-[16px] text-white p-[15px] bg-[#C29B06] rounded-md disabled:bg-gray-200 disabled:cursor-no-drop"
            onClick={handleSubmit(onSubmit)}
          >
            Pay Now
          </button>
        </div>
      </div>
      {openModal && (
        <AdminPaymentModal
          openModal={openModal}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default Rental;

const CartCard = ({
  title,
  quantity,
  size,
  color,
  price,
  img,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-4">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          <li className="flex py-6">
            <div className="h-[50px] w-[50px] self-center bg-gray-200 flex-shrink-0  rounded-md border border-gray-200">
              {img && (
                <img
                  src={img}
                  alt={title}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between  text-base font-medium text-gray-900">
                  <p>{title}</p>
                  <div className="flex flex-row items-center">
                    <CurrencyNgn size={15} />
                    <p className="text-[16px]">{price}</p>
                  </div>
                </div>
                {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
              </div>
              <div>
                <p className="text-sm">
                  <span className="text-slate-500">Size: </span>
                  {size} <span className="text-slate-500">Color: </span>
                  {color}
                </p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty {quantity}</p>

                <div className="flex flex-row">
                  <IconButton
                    onClick={onEdit}
                    sx={{
                      padding: 0,
                    }}
                  >
                    <NotePencil size={20} />
                  </IconButton>
                  <IconButton
                    onClick={onDelete}
                    sx={{
                      padding: 0,
                      marginLeft: 1,
                    }}
                  >
                    <Trash size={20} color="red" />
                  </IconButton>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
