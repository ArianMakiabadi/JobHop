import AuthContainer from "../features/authentication/AuthContainer";
import CheckOTPForm from "../features/authentication/CheckOTPForm";
import SendOTPForm from "../features/authentication/SendOTPForm";

function Auth() {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <AuthContainer />
      </div>
    </div>
  );
}

export default Auth;
