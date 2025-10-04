import { useState } from "react";
import TextField from "../../UI/TextField";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "../../services/authService";
import toast from "react-hot-toast";

function SendOTPForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const { error, isPending, data, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border shadow-md px-10 pb-24 pt-12 w-[28rem] mx-auto rounded-xl">
      <h2 className="font-bold text-lg pb-2">Login | signup</h2>
      <form className="space-y-4" onSubmit={sendOtpHandler}>
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"Phone number"}
          label={"Please enter your phone number"}
          name={"phonenumber"}
          value={phoneNumber}
        />
        <button type="submit" className="btn btn--primary w-full">
          Next
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
