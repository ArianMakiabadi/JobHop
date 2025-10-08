import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { checkOtp } from "../../services/authService";
import toast from "react-hot-toast";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Loading from "../../UI/Loading";
const OTP_RESEND_DELAY = 90;

function CheckOTPForm({ phoneNumber, onBack, onResendOtp }) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(OTP_RESEND_DELAY);

  const { isPending, mutateAsync } = useMutation({
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

  useEffect(() => {
    const timer =
      time > 0 && setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="border shadow-md px-10 pb-10 pt-10 w-[28rem] mx-auto rounded-3xl">
      <button>
        <HiArrowNarrowLeft
          className="w-6 h-6 mb-4 text-secondary-500"
          onClick={onBack}
        />
      </button>
      <form className="space-y-5" onSubmit={checkOtpHandler}>
        <h2 className="text-center font-bold text-3xl">Verify your number</h2>
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
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="w-full btn btn--primary">
              Verify
            </button>
          )}
        </div>
        <div className="mb-4 text-center text-xs text-secondary-500">
          {time > 0 ? (
            <p>Request a new code in {time} seconds</p>
          ) : (
            <button
              className="underline"
              onClick={(e) => {
                onResendOtp(e); // calls sendOtpHandler()
                setTime(OTP_RESEND_DELAY); // resets countdown
              }}
            >
              Get another code?
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
