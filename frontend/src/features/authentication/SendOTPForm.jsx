import Loading from "../../UI/Loading";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import { useNavigate } from "react-router-dom";
import "react-international-phone/style.css";

function SendOTPForm({ isSendingOtp, onSubmit, control, validationSchema }) {
  const navigate = useNavigate();
  return (
    <div className="border shadow-md px-10 pb-8 pt-10 mx-auto rounded-3xl">
      <h2 className="font-bold text-secondary-700 text-3xl md:text-4xl text-center pb-2">
        Login | signup
      </h2>

      {/* Create Account Section */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-700 mb-2 text-center">
          Create Your Account
        </h3>
        <p className="text-secondary-600 mb-6 text-center text-sm">
          Sign up or log in with your phone number to get started. Create your
          profile, post projects, or apply to opportunities.
        </p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={validationSchema}
            render={({ field }) => (
              <div>
                <PhoneInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  country="de"
                  defaultCountry="de"
                  inputStyle={{ width: "100%" }}
                  inputProps={{ name: "phoneNumber", required: true }}
                />
              </div>
            )}
          />
          <div>
            {isSendingOtp ? (
              <Loading />
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                Next
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-secondary-300"></div>
        <span className="px-3 text-secondary-500 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-secondary-300"></div>
      </div>

      {/* Demo Login Section */}
      <div>
        <h3 className="text-lg font-semibold text-secondary-700 mb-2 text-center">
          Try Demo Accounts
        </h3>
        <p className="text-secondary-600 mb-6 text-center text-sm">
          Explore the platform instantly with pre-configured demo accounts. No
          registration needed. Experience all features for Employers,
          Freelancers, and Admins.
        </p>
        <button
          type="button"
          onClick={() => navigate("/demo-login")}
          className="btn btn--outline w-full"
        >
          Explore with Demo Login
        </button>
      </div>
    </div>
  );
}

export default SendOTPForm;
