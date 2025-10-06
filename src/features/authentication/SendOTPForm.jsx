import { useState } from "react";
import TextField from "../../UI/TextField";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";

function SendOTPForm({ setStep, setPhoneNumber, phoneNumber }) {
  const { error, isPending, data, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border shadow-md px-10 pb-20 pt-12 w-[28rem] mx-auto rounded-3xl">
      <h2 className="font-bold text-3xl text-center pb-4">Login | signup</h2>
      <form className="space-y-4" onSubmit={sendOtpHandler}>
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"Phone number"}
          label={"Please enter your phone number"}
          name={"phonenumber"}
          value={phoneNumber}
        />
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
