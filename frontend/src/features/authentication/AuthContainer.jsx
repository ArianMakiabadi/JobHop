import { useEffect, useState } from "react";
import CheckOTPForm from "./CheckOTPForm";
import SendOTPForm from "./SendOTPForm";
import { getOtp } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

function AuthContainer() {
  const [step, setStep] = useState(1);
  const { user } = useUser();
  const navigate = useNavigate();
  const { isPending: isSendingOtp, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "FREELANCER":
          navigate("/freelancer");
          break;
        case "EMPLOYER":
          navigate("/employer");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  const sendOtpHandler = async (data) => {
    const phoneNumber = String(data.phoneNumber || "").trim();
    // If the PhoneInput only provides a country code (e.g. "+49") it shouldn't be sent.
    // Reject if the value is just +<1-3 digits> (typical country calling codes),
    // or if the total digits are too short.
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    if (
      !phoneNumber ||
      /^\+\d{1,3}$/.test(phoneNumber) ||
      digitsOnly.length < 9
    ) {
      // safety: do not call API if phone is empty or clearly invalid
      toast.error("Please enter a valid phone number.");
      return;
    }
    try {
      const { message } = await mutateAsync({ phoneNumber });
      toast.success(message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            control={control}
            isSendingOtp={isSendingOtp}
            onSubmit={handleSubmit(sendOtpHandler)}
            setStep={setStep}
            register={register}
            errors={errors}
            validationSchema={{
              required: "Please enter your phone number.",
              pattern: {
                value: /^\+?[0-9]+$/,
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
