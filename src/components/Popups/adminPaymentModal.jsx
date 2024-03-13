import React, { useState } from "react";
import PopUpModal from "../PopupModal";

function AdminPaymentModal({ openModal, handleClose }) {
  const [paymentOption, setPaymentOption] = useState("");

  const paymentChange = (e) => {
    setPaymentOption(e.target.value);
  };
  return (
    <div>
      <PopUpModal
        openPopUp={openModal}
        handleClose={handleClose}
        borderRadius="15px"
        // maxWidth="md"
        sx={{ pl: "68px", pr: "68px", maxWidth: "655px", bgColor: "#E1CCAE" }}
      >
        <form>
          <div className="flex flex-col">
            <p className="mt-[30px] text-[12px] md:text-[16px] font-bold">
              Payment
            </p>
            <p className="mt-[10px] mb-[30px] text-[12px] md:text-[16px]">
              All transactions are secured and encrypted.
            </p>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Cash-transfer"
                  checked={paymentOption === "Cash-transfer"}
                  onChange={paymentChange}
                  className="form-radio md:h-5 md:w-5 w-[12px] h-[12px] text-indigo-600 outline-none"
                />
                <span className="ml-2 text-gray-700 md:text-[18px] text-[12px]">
                  Cash transfer
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Bank-transfer"
                  checked={paymentOption === "Bank-transfer"}
                  onChange={paymentChange}
                  className="form-radio md:h-5 md:w-5 w-[12px] h-[12px]text-indigo-600 outline-none"
                />
                <span className="ml-2 text-gray-700 my-[15px] md:text-[18px] text-[12px]">
                  Bank Transfer
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Via-Card"
                  checked={paymentOption === "Via-Card"}
                  onChange={paymentChange}
                  className="form-radio md:h-5 md:w-5 w-[12px] h-[12px] text-indigo-600 outline-none"
                />
                <span className="ml-2 text-gray-700 md:text-[18px] text-[12px]">
                  Via Card
                </span>
              </label>
            </div>
            {paymentOption === "Bank-transfer" && (
              <div className="flex flex-col w-[350px] md:w-[572px] mt-[20px]">
                <p className="text-[12px] md:text-[16px]">
                  Bank Name: Guaranty Trust Bank
                </p>
                <p className="text-[12px] md:text-[16px]">
                  Account Number: 0123456789
                </p>
                <p className="text-[12px] md:text-[16px]">
                  Account Name: Teesbridal
                </p>
                <p className="text-[12px] md:text-[16px]">
                  Send proof of payment for confirmation to +2341234567890
                </p>
              </div>
            )}
            {paymentOption === "Via-Card" && (
              <div className="flex flex-col">
                <div className="flex justify-between items-center  mt-[80px]">
                  <p className="text-[18px] text-[#202020">Card Type:</p>
                  <select
                    name=""
                    //   {...register("role")}
                    className="w-[371px] border border-gray-200 p-[14px] rounded-md outline-none"
                  >
                    <option value="" className="text-[10px]" disabled selected>
                      Select card type
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="flex justify-between items-center  mt-[30px]">
                  <p className="text-[18px] text-[#202020">Pay Amount:</p>
                  <input
                    type="text"
                    name=""
                    placeholder="Enter the amount"
                    className="px-[25px] py-[20px] border w-[371px] rounded-md text-[10px] outline-none"
                  />
                </div>
                <div className="flex justify-between items-center  mt-[30px]">
                  <p className="text-[18px] text-[#202020">Discount:</p>
                  <input
                    type="text"
                    name=""
                    placeholder="Enter discount (optional)"
                    className="px-[25px] py-[20px] border w-[371px] rounded-md text-[10px] outline-none"
                  />
                </div>
                <div className="flex justify-between items-center  mt-[30px]">
                  <p className="text-[18px] text-[#202020">Total Amount:</p>
                  <input
                    type="text"
                    name=""
                    placeholder="Enter total amount"
                    className="px-[25px] py-[20px] border w-[371px] rounded-md text-[10px] outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-[100px] mb-[104px]">
              <button
                onClick={handleClose}
                className="text-[18px] text-[#202020] w-[250px] p-[14px] border border-1px border-[#F81616] rounded-md"
              >
                Cancel
              </button>
              <button className="text-[18px] text-white bg-[#C29B06]  p-[14px] w-[250px] rounded-md">
                Accept
              </button>
            </div>
          </div>
        </form>
      </PopUpModal>
    </div>
  );
}

export default AdminPaymentModal;
