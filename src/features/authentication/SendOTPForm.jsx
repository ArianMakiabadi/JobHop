import TextField from "../../UI/TextField";
import Loading from "../../UI/Loading";

function SendOTPForm({
  isSendingOtp,
  onSubmit,
  register,
  validationSchema,
  errors,
}) {
  return (
    <div className="border shadow-md px-10 pb-8 pt-10 w-[28rem] mx-auto rounded-3xl">
      <h2 className="font-bold text-3xl text-center pb-2">Login | signup</h2>
      <p className="text-secondary-600 mb-6 text-center">
        Enter your phone number to continue
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          label="Phone number"
          name="phoneNumber"
          register={register}
          errors={errors}
          validationSchema={validationSchema}
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
