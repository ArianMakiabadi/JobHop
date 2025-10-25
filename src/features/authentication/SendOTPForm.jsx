import Loading from "../../UI/Loading";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function SendOTPForm({ isSendingOtp, onSubmit, control, validationSchema }) {
  return (
    <div className="border shadow-md px-10 pb-8 pt-10 mx-auto rounded-3xl">
      <h2 className="font-bold text-secondary-700 text-3xl md:text-4xl text-center pb-2">
        Login | signup
      </h2>
      <p className="text-secondary-600 mb-6 text-center">
        Enter your phone number to continue
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
  );
}

export default SendOTPForm;
