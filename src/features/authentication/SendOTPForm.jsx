import { useState } from "react";
import TextField from "../../UI/TextField";

function SendOTPForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div className="border shadow-md px-10 pb-24 pt-12 w-[28rem] mx-auto rounded-xl">
      <h2 className="font-bold text-lg pb-2">Login | signup</h2>
      <form className="space-y-4">
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"Phone number"}
          label={"Please enter your phone number"}
          name={"phonenumber"}
          value={phoneNumber}
        />
        <button className="btn btn--primary w-full">Next</button>
      </form>
    </div>
  );
}

export default SendOTPForm;
