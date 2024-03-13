import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { bigTwoCircle } from "../../../assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../components/InputField"
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { updateLocationSuccess } from "../../redux/location/location";

const searchSchema = yup.object().shape({
  postalCode: yup.string().required("Postal code is required"),
});

function SearchPage() {
  
  const { allowedCountries } = useSelector((state) => state.location);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      postalCode: "",
    },
    resolver: yupResolver(searchSchema),
  });
  const dispatch = useDispatch()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);

    let locationIndex = await allowedCountries.findIndex(
      (el) => el.postalCode === data.postalCode
    );
    const country = allowedCountries[locationIndex];

    if(country){
      dispatch(updateLocationSuccess(country))
      toast.success("location found successfully!!!");
      setLoading(false);
      reset();
    } else {
      // show error popup
      toast.error("you cannot access our website from your location!!!");
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[85%] mx-[20px] md:max-w-[740px] md:mx-auto">
      {/* <div className="absolute z-10 h-[420px] w-full max-md:top-[50%] max-md:translate-y-[-60%]  md:h-[720px] md:w-[720px] mx-auto left-0 right-0">
        <img src={bigTwoCircle} className="w-full object-contain h-full" />
      </div> */}
      <div className="flex items-center w-[100%] justify-center">
        <div className="flex z-50 flex-col justify-center w-[100%]">
          <h3 className="text-black font-montserrat text-[14px] md:text-[24px] font-bold tracking-wider leading-normal text-center mt-[62px]">
            Find Location
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[100%]"
          >
            <InputField
              label={"Postal Code"}
              type="text"
              required={true}
              placeholder="Enter the postal code of your location"
              register={{ ...register("postalCode") }}
              error={errors.postalCode?.message}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="text-[16px] text-white bg-[#C29B06] h-[50px]  mt-[30px] w-[100%] sm:w-[250px] md:w-[453px] rounded-md"
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "white" }} />
                ) : (
                  "Find"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
