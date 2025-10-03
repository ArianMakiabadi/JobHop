import { useState } from "react";
import TextField from "../../UI/TextField";

function SendOTPForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <form className="space-y-4">
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"Enter your phone number"}
          label={"Phone number"}
          name={"phonenumber"}
          value={phoneNumber}
        />
        <button className="btn btn--primary w-full">Next</button>
      </form>
    </div>
  );
}

export default SendOTPForm;
