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

function RentalTOCModal({ tocModal, handleClose }) {
  const [isFormActive, setIsFormActive] = useState(false);


  return (
    <div>
      <PopUpModal
        openPopUp={tocModal}
        handleClose={handleClose}
        borderRadius="15px"
        maxWidth="md"
        sx={{ pl: "68px", pr: "68px", height: "auto" }}
      >
        <div className="flex flex-col">
          <p className="mt-[20px] underline text-center text-[13px] md:text-[24px]">
            Tees Bridal Rentals Term and Conditions
          </p>
          <div className="md:p-[68px]">
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              The Customer shall undertake to do the following :
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              1) Keep the gown from damage, fire, tear, firework flames,
              irreversible stains
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              2) Where the customer requires the gown to be delivered outside
              Ibadan cost of delivery shall be paid by the customer{" "}
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              3) The customer is is required to pay a caution fee of 20-50k
              depending on the grade of the dress which will be refunded after
              the dress has been returned in good shape{" "}
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              4) The gown is to be returned latest Tuesday after the wedding
              failure to do so will require a fine of 5k per day{" "}
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              5) No refund after payment is made, we only do dress exchange{" "}
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              6) Soft copy and hard copy of the customer’s wedding invitation is
              required for record purpose
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              7) Any gown that is extremely dirty will be charged for extra dry
              cleaning fees
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              8) On no account should any customer Dry clean our dress after
              picking up from the store (we dry clean ourselves)
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              9) In the situation whereby any gown is damaged you’re expected to
              pay for all damages caused, legal action will be taken if the
              customer refuses to pay for damages{" "}
            </p>
            <p className="p-[20px] md:p-[10px] text-[12px] md:text-[16px]">
              10) Payment validates bookings and you’re expected to pay your
              balance before picking up
            </p>
          </div>
        </div>
      </PopUpModal>
    </div>
  );
}

export default RentalTOCModal;
