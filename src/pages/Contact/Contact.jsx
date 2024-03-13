import { useState } from "react";
// import { bigTwoCircle } from "../../../assets";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";

const sendComplaintSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().required("Email address is required"),
  subject: yup.string().required("Subject is required"),
  phone: yup.string().required("Phone number is required"),
  message: yup.string().required("Message is required"),
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    },
    resolver: yupResolver(sendComplaintSchema),
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
      "Content-Type": "application/json",
      // Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        phone: data.phone,
        message: data.message,
      };

      console.log(formattedData);
      const response = await axios.post(
        "customers/complaints",
        formattedData,
        headerConfig
      );
      toast.success("Message sent successfully!");
      setLoading(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[85%] mx-[20px] md:max-w-[740px] md:mx-auto">
      <div className="absolute z-10 h-[420px] w-full max-md:top-[50%] max-md:translate-y-[-60%]  md:h-[720px] md:w-[720px] mx-auto left-0 right-0">
        <img src={bigTwoCircle} className="w-full object-contain h-full" />
      </div>
      <div className="flex items-center w-[100%] justify-center">
        <div className="flex z-50 flex-col justify-center w-[100%]">
          <h3 className="text-black font-montserrat text-[14px] md:text-[24px] font-bold tracking-wider leading-normal text-center mt-[62px]">
            Contact Us
          </h3>
          <p className="mt-[20px] text-center">
            Address : Last floor, Tundun Complex beside Aleshinloye market
            Ibadan, Oyo State, Nigeria
          </p>
          <p className="mt-[20px] text-center">Phone Number: 07033667688</p>
          <p className="mt-[20px] text-center">IG : @tees_bridals</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[100%]"
          >
            <label className="mt-[56px] text-[12px] md:text-[28px]">
              {" "}
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="md:h-12 h-[30px] outline-none text-[12px] md:text-[16px] flex-shrink-0 rounded-md border border-gray-700 p-[10px] mt-[15px] bg-transparent"
            />
            <p className="text-[red] text-[12px] mb-[20px]">
              {errors.name?.message}
            </p>
            <label className="mt-[30px] md:mt-[40px] text-[12px] md:text-[28px]">
              {" "}
              Email Address
            </label>
            <input
              type="text"
              {...register("email")}
              className="md:h-12 h-[30px] outline-none text-[12px] md:text-[16px] flex-shrink-0 rounded-md border border-gray-700 p-[10px] mt-[15px] bg-transparent"
            />
            <p className="text-[red] text-[12px] mb-[20px]">
              {errors.email?.message}
            </p>
            <label className="mt-[56px] text-[12px] md:text-[28px]">
              {" "}
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              className="md:h-12 h-[30px] outline-none text-[12px] md:text-[16px] flex-shrink-0 rounded-md border border-gray-700 p-[10px] mt-[15px] bg-transparent"
            />
            <p className="text-[red] text-[12px] mb-[20px]">
              {errors.phone?.message}
            </p>
            <label className="mt-[56px] text-[12px] md:text-[28px]">
              {" "}
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              className="md:h-12 h-[30px] outline-none text-[12px] md:text-[16px] flex-shrink-0 rounded-md border border-gray-700 p-[10px] mt-[15px] bg-transparent"
            />
            <p className="text-[red] text-[12px] mb-[20px]">
              {errors.subject?.message}
            </p>
            <label className="mt-[30px] md:mt-[56px] text-[12px] md:text-[28px]">
              {" "}
              Message
            </label>
            <textarea
              name="description"
              {...register("message")}
              id=""
              cols="30"
              rows="10"
              placeholder="Write your message here"
              className="bg-transparent p-[10px] outline-none border border-gray-700 rounded-md"
            ></textarea>
            <p className="text-[red] text-[12px] mb-[20px]">
              {errors.message?.message}
            </p>

            <div className="flex justify-between w-[100%]">
              <div className="w-[100%]">
                <button
                  type="submit"
                  className="text-white mt-[75px] md:mt-[122px] w-[165px] md:w-[100%] text-[12px] md:text-[16px] h-[30px] md:h-[50px] bg-[#C29B06] font-montserrat font-normal leading-normal tracking-wide md:py-2 px-4 rounded mb-[96px]"
                >
                  {loading ? (
                    <CircularProgress size={26} sx={{ color: "white" }} />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
