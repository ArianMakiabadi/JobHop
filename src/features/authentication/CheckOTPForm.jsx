import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";

function CheckOTPForm({ phoneNumber }) {
  const [otp, setOtp] = useState("");

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateAsync({ phoneNumber, otp });
      console.log(data);
      toast.success(data.message);
      //if data user is completed => push to /owner /freelancer
      //else push to /complete-profile
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border shadow-md px-10 pb-24 pt-12 w-[28rem] mx-auto rounded-xl">
      <form className="space-y-5" onSubmit={checkOtpHandler}>
        <p className="text-slate-900 text-lg">
          Enter the 6-digit code we sent to your phone
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type="text" {...props} />}
          containerStyle="flex gap-x-2 justify-center"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-400))",
            borderRadius: "0.5rem",
          }}
        />
        <button className="w-full btn btn--primary">Verify</button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
