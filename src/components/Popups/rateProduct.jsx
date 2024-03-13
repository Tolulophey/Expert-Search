import React, { useState } from "react";
import PopUpModal from "../PopupModal/index";
import {
  Stack,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const addReviewSchema = yup.object().shape({
  rate: yup.number().required("Rate the product"),
  review: yup.string().required("Review is required"),
});

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RateProduct = ({ showReviewPopup, handleClose, selectedItem }) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { deleteLoading } = useSelector((state) => state.stock);
  const [starValue, setStarValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const methods = useForm({
    defaultValues: {
      rate: null,
      review: "",
    },
    resolver: yupResolver(addReviewSchema),
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

  console.log(selectedItem);

  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const rate = watch("rate", 0.5);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        product: "65b5e8159814fb33f788087e",
        rate: data.rate,
        review: data.review,
      };

      // JSON.stringify(selectedItem.id)

      console.log(formattedData);
      const response = await axios.post(
        "customers/reviews",
        formattedData,
        headerConfig
      );
      toast.success("Review submitted successfully!");
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const buttonStyle = {
    width: { xs: "100px", md: "200px" },
    height: { xs: "40px", md: "50px" },
    textTransform: "inherit",
    color: "black",
    borderRadius: "5px",
    border: "1px solid #F81616",
    fontSize: { xs: "10px", md: "14px" },
    fontWeight: 700,
  };

  const isLoading = false;
  return (
    <>
      <PopUpModal openPopUp={showReviewPopup} handleClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            width={{ xs: "276px", md: "435px" }}
            maxWidth={"100%"}
            marginX="auto"
            marginBottom={{ xs: "40px", sm: "44px" }}
            alignItems="center"
          >
            <Typography
              variant="h6"
              component="h2"
              textAlign="center"
              fontSize={{ xs: "10px", sm: "16px" }}
            >
              Rate this product
            </Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                my: "20px",
              }}
            >
              <Rating
                {...register("rate")}
                name="hover-feedback"
                value={starValue}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setStarValue(newValue);
                  setValue("rate", newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {starValue !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : starValue]}
                </Box>
              )}
            </Box>
            <p className="text-[red] text-[12px] mb-[10px]">
              {errors.rate?.message}
            </p>
            <input
              type="text"
              {...register("review")}
              placeholder="Enter your comment"
              className="border w-full p-[20px] mb-[10px] outline-none"
            />
            <p className="text-[red] text-[12px] mb-[30px]">
              {errors.review?.message}
            </p>
            <Box
              sx={{
                width: { xs: "250px", md: "100%" },
                display: "flex",
                justifyContent: `${deleteLoading ? "center" : "space-between"}`,
              }}
            >
              {deleteLoading ? (
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress sx={{ color: "#fdb73d" }} size={20} />
                </Stack>
              ) : (
                <>
                  <Button
                    onClick={handleClose}
                    sx={{
                      ...buttonStyle,
                    }}
                  >
                    {"Cancel"}
                  </Button>
                  <Button
                    type="submit"
                    sx={{
                      width: { xs: "100px", md: "200px" },
                      height: { xs: "40px", md: "50px" },
                      textTransform: "inherit",
                      borderRadius: "5px",
                      fontSize: { xs: "10px", md: "14px" },
                      fontWeight: 700,
                      backgroundColor: "#C29B06",
                      color: "white",
                      ":hover": { backgroundColor: "#C29B06" },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={26} sx={{ color: "white" }} />
                    ) : (
                      " Submit"
                    )}
                  </Button>
                </>
              )}
            </Box>
          </Stack>
        </form>
      </PopUpModal>
    </>
  );
};

export default RateProduct;
