import TextField from "../../UI/TextField";
import RadioButton from "../../UI/RadioButton";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function CompleteProfileForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const formSubmit = async (data) => {
    try {
      const { user } = await mutateAsync(data);
      if (user.status !== 2) {
        navigate("/");
        toast("Awaiting admin approval", { icon: "⏳" });
        return;
      }
      if (user.role === "EMPLOYER") return navigate("/employer");
      if (user.role === "FREELANCER") return navigate("/freelancer");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center border shadow-md px-10 pb-10 pt-10 mt-10 w-[28rem] mx-auto rounded-3xl">
      <div className="w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold mb-1">Almost There!</h2>
        <p className="text-center text-sm text-secondary-500 mb-5">
          Complete your profile to unlock your dashboard.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
          <TextField
            label="Firstname & Lastname"
            name="name"
            errors={errors}
            register={register}
            validationSchema={{
              required: "Name is required.",
              pattern: {
                value: /^[A-Za-z\s]{2,50}$/,
                message: "Name must be 2-50 characters and only letters",
              },
            }}
          />
          <TextField
            label="Email address"
            name="email"
            register={register}
            errors={errors}
            validationSchema={{
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address.",
              },
            }}
          />
          <div className="flex gap-4 items-center mt-4">
            <p className="text-slate-600">Role:</p>
            <div className="flex gap-3 flex-1">
              <RadioButton
                name="role"
                value="EMPLOYER"
                id="EMPLOYER"
                label="Employer"
                stretch={true}
                register={register}
                validationSchema={{ required: "Please select your role." }}
              />
              <RadioButton
                name="role"
                value="FREELANCER"
                id="FREELANCER"
                label="Freelancer"
                stretch={true}
                register={register}
              />
            </div>
          </div>
          {errors && errors.role && (
            <span className="text-error block text-sm mt-0.5">
              {errors.role?.message}
            </span>
          )}
          <div>
            {isPending ? (
              <Loading />
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                Let’s go!
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfileForm;
