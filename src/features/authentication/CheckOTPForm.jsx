import { useState } from "react";
import OTPInput from "react-otp-input";

function CheckOTPForm() {
  const [otp, setOtp] = useState(null);
  return (
    <div className="border shadow-md px-10 pb-24 pt-12 w-[28rem] mx-auto rounded-xl">
      <form className="space-y-5">
        <p className="text-slate-900 text-lg">
          Enter the 6-digit code we sent to your phone
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type="number" {...props} />}
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
