import { useState } from "react";
import CheckOTPForm from "./CheckOTPForm";
import SendOTPForm from "./SendOTPForm";
import { getOtp } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function AuthContainer() {
  const { isPending: isSendingOtp, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const sendOtpHandler = async (data) => {
    const phoneNumber = String(data.phoneNumber).trim();
    try {
      const { message } = await mutateAsync({ phoneNumber });
      toast.success(message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [step, setStep] = useState(1);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            isSendingOtp={isSendingOtp}
            onSubmit={handleSubmit(sendOtpHandler)}
            setStep={setStep}
            register={register}
            errors={errors}
            validationSchema={{
              required: "Please enter your phone number.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed.",
              },
            }}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onResendOtp={sendOtpHandler}
            phoneNumber={getValues("phoneNumber")}
            onBack={() => setStep(1)}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full sm:max-w-sm">{renderStep()}</div>;
}

export default AuthContainer;
