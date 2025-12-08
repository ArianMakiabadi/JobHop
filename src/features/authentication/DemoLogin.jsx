import { useMutation } from "@tanstack/react-query";
import TextField from "../../UI/TextField";
import { useNavigate } from "react-router-dom";
import { demoLogin } from "../../services/authService";
import { useForm } from "react-hook-form";
import Loading from "../../UI/Loading";
import toast from "react-hot-toast";

function DemoLogin() {
  const navigate = useNavigate();
  const { isPending: isLogingIn, mutateAsync } = useMutation({
    mutationFn: demoLogin,
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { user, message } = await mutateAsync({ email, password });
      toast.success(message);

      const roleRoutes = {
        EMPLOYER: "/employer",
        FREELANCER: "/freelancer",
        ADMIN: "/admin",
      };
      const route = roleRoutes[user.role];
      if (route) navigate(route);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div className="border shadow-md px-10 pb-8 pt-10 w-[28rem] mx-auto rounded-3xl">
          <h2 className="font-bold text-secondary-700 text-3xl text-center pb-2">
            Demo Login
          </h2>
          <p className="text-secondary-600 mb-6 text-center">
            Enter your email and password to continue
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              name="email"
              register={register}
              errors={errors}
              required
              validationSchema={{
                required: "Enter your email.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address.",
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              validationSchema={{
                required: "Enter your password.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              }}
              required
            />
            <div>
              {isLogingIn ? (
                <Loading />
              ) : (
                <button type="submit" className="btn btn--primary w-full">
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DemoLogin;
