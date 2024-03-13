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
  Grid,
  Stack,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Chip,
  Box,
  CircularProgress,
  TextField,
  OutlinedInput,
} from "@mui/material";
import { updateStockList } from "../../redux/product/productSlice";
import InputField from "../InputField";
import SelectField from "../SelectField";

const addStockSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  productCode: yup.string().required("Product code is required"),
  costPrice: yup.string().required("Cost price is required"),
  quantity: yup.string().required("Quantity is required"),
  category: yup.string().required("Select a category"),
  listingType: yup.string().required("Select a listing"),
});


const colors = ["Blue", "Red", "White", "Custom"];


function getStyles(name, stock, theme) {
  return {
    fontWeight:
      stock.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddStock({ addStockModal, handleClose }) {
  const [stock, setStock] = React.useState([]);
  const sizeRef = useRef(null);
  const [guideChanged, setGuideChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { sizes, sizeObj } = useSelector((state) => state.size);
  const { categories } = useSelector((state) => state.category);
  const methods = useForm({
    defaultValues: {
      name: "",
      costPrice: "",
      productCode: "",
      highPrice: "",
      lowPrice: "",
      mediumPrice: "",
      size: [],
      quantity: 1,
      color: [],
      category: "",
      sizeGuide: "",
      listingType: "",
      description: "",
      photo: "",
    },
    resolver: yupResolver(addStockSchema),
  });

  const {
    reset,
    register,
    resetField,
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
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const photo = watch("photo", []);
  const size = watch("size", []);
  const sizeGuide = watch("sizeGuide", "");
  const color = watch("color", []);
  const quantity = watch("quantity", 1);
  const listingType = watch("listingType", "");

  console.log(sizeGuide);

  useEffect(() => {
    sizeRef.current = sizeObj[sizeGuide];
    resetField("size");
    setGuideChanged(true);
    setTimeout(() => {
      setGuideChanged(false);
    }, 1000);
  }, [sizeGuide]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let formattedData = {
        name: data.name,
        costPrice: data.costPrice,
        product_id: data.productCode,
        size: data.size,
        quantity: data.quantity,
        sizeGuide: data.sizeGuide,
        color: data.color,
        category: data.category,
        listingType: data.listingType,
        description: data.description,
      };
      if (data.listingType.toLowerCase() === "rental") {
        formattedData.sellingPrices = {
          highPrice: data.highPrice.toString(),
          lowPrice: data.lowPrice.toString(),
          mediumPrice: data.mediumPrice.toString(),
        };
      } else {
        formattedData.sellingPrice = data.sellingPrice;
      }

      const form = new FormData();
      form.append("json", JSON.stringify(formattedData));
      if (photo.length >= 1) {
        Array.from(photo).forEach((img) => form.append("files", img));
      }
      const res = await axios.post("/admin/stocks/add", form, headerConfig);
      const new_data = res.data.data;
      dispatch(
        updateStockList({
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
      handleClose();
      setLoading(false);
      toast.success("Stock added successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleIncrement = () => {
    setValue("quantity", Number(quantity) + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setValue("quantity", Number(quantity) - 1);
    }
  };

  return (
    <PopUpModal
      openPopUp={addStockModal}
      handleClose={handleClose}
      borderRadius="15px"
      maxWidth="md"
      sx={{ pl: "68px", pr: "68px" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <SelectField
              required={true}
              label={"Listing Type"}
              placeholder={"Select listing"}
              {...register("listingType")}
              error={errors.listingType?.message}
            >
              <MenuItem value="rental">Rental</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
            </SelectField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-[16px]">
            <InputField
              label={"Name of Product"}
              type="text"
              required={true}
              placeholder="Enter the name of the product"
              register={{ ...register("name") }}
              error={errors.name?.message}
            />
            <InputField
              label={"Product Code"}
              type="text"
              required={true}
              placeholder="Enter product code"
              register={{ ...register("productCode") }}
              error={errors.productCode?.message}
            />
            <InputField
              label={"Cost price"}
              type="text"
              required={true}
              placeholder="Enter the Cost Price"
              register={{ ...register("costPrice") }}
              error={errors.costPrice?.message}
            />
          </div>

          <div
            className={`grid grid-cols-1  ${
              listingType === "sales" ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }  gap-4 mt-[16px]`}
          >
            {listingType === "sales" && (
              <InputField
                label={"Selling price"}
                type="number"
                required={true}
                placeholder="Enter the selling Price"
                register={{ ...register("sellingPrice") }}
                error={errors.sellingPrice?.message}
              />
            )}
            <div>
              <p className="text-[12px]  md:text-[16px] text-[#202020]">
                Quantity <span className="text-red-600"> *</span>
              </p>
              <div className="flex border rounded-md border-gray-700 justify-between my-[8px] items-center px-[20px]">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="mr-2"
                >
                  -
                </button>
                <div>
                  <input
                    type="number"
                    {...register("quantity")}
                    className="outline-none text-[12px]  md:text-[16px] py-[10px]  text-center"
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
            <SelectField
              required={true}
              label={"Product Category"}
              placeholder={"Select Category"}
              {...register("category")}
              error={errors.category?.message}
            >
              {categories?.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </SelectField>
          </div>

          {listingType === "rental" && (
            <div className="grid grid-cols-3 gap-3 w-full my-[16px]">
              <InputField
                label={"High Price"}
                required={true}
                type="number"
                placeholder="Enter the high selling price"
                register={{ ...register("highPrice") }}
              />

              <InputField
                required={true}
                label={"Medium Price"}
                type="number"
                placeholder="Enter the medium selling price"
                register={{ ...register("mediumPrice") }}
              />

              <InputField
                required={true}
                label={"Low Price"}
                type="number"
                placeholder="Enter the low selling price"
                register={{ ...register("lowPrice") }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-[16px]">
          <div>
              <SelectField
                label={"Color"}
                placeholder={"Select color"}
                {...register("color")}
                multiple
                value={color}
              >
                {colors?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectField>
            </div>
            <div>
              <SelectField
                label={"Size Guide"}
                placeholder={"Select size guide"}
                {...register("sizeGuide")}
                error={errors.sizeGuide?.message}
              >
                {sizes?.map((item) => (
                  <MenuItem key={item._id} value={item.guide}>
                    {item.guide}
                  </MenuItem>
                ))}
              </SelectField>
            </div>
            <div>
              <SelectField
                label={"Size"}
                disabled={sizeGuide === ""}
                multiple
                value={size}
                placeholder={"Select size"}
                {...register("size")}
              
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((value) => (
                      <Chip
                        sx={{ fontSize: "12px" }}
                        key={value}
                        label={value}
                      />
                    ))}
                  </Box>
                )}
              >
                {sizeRef?.current?.map((size) => (
                  <MenuItem
                    key={size}
                    value={size}
                    style={getStyles(size, sizeRef.current, theme)}
                  >
                    {size}
                  </MenuItem>
                ))}
              </SelectField>
            </div>
          </div>

          <div>
            <label className="text-[12px] md:text-[16px] text-[#202020]">
              Upload Images
            </label>
            <input
              name="photo"
              {...register("photo")}
              className="custom-file-input cursor-pointer my-[8px]"
              type="file"
              style={{ width: "100%", height: "60px" }}
              placeholder="Select file"
              multiple
            />
            {errors.photo && (
              <p className="text-[red] text-[12px]">{errors.photo?.message}</p>
            )}
          </div>
        </div>

        <div>
          <InputField
            label={"Description"}
            type="text"
            placeholder="Enter the description of the product"
            register={{ ...register("description") }}
            error={errors.description?.message}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-[16px] text-white bg-[#C29B06] h-[50px]  mt-[30px] w-[453px] rounded-md"
          >
            {loading ? (
              <CircularProgress size={26} sx={{ color: "white" }} />
            ) : (
              "Add Stock"
            )}
          </button>
        </div>
      </form>
    </PopUpModal>
  );
}

export default AddStock;
