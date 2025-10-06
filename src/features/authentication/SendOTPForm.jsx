import TextField from "../../UI/TextField";
import Loading from "../../UI/Loading";

function SendOTPForm({ isSendingOtp, onSubmit, setPhoneNumber, phoneNumber }) {
  return (
    <div className="border shadow-md px-10 pb-20 pt-12 w-[28rem] mx-auto rounded-3xl">
      <h2 className="font-bold text-3xl text-center pb-4">Login | signup</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"Phone number"}
          label={"Please enter your phone number"}
          name={"phonenumber"}
          value={phoneNumber}
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
