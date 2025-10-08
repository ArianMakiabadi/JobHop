import { useState } from "react";
import TextField from "../../UI/TextField";
import RadioButton from "../../UI/RadioButton";
import { useMutation } from "@tanstack/react-query";
import { completeProfile } from "../../services/authService";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";

function CompleteProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ name, email, role });
      console.log(user);
      toast.success(message);
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

        <form className="space-y-2" onSubmit={handleSubmit}>
          <TextField
            label="Firstname & Lastname"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={name}
          />
          <TextField
            label="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={email}
          />
          <div className="flex gap-4 items-center mt-4">
            <p className="text-slate-600">Role:</p>
            <div className="flex gap-3 flex-1">
              <RadioButton
                name="role"
                value="OWNER"
                id="EMPLOYER"
                label="Employer"
                stretch={true}
                onChange={(e) => setRole(e.target.value)}
                checked={role === "EMPLOYER"}
              />
              <RadioButton
                name="role"
                value="FREELANCER"
                id="FREELANCER"
                label="Freelancer"
                stretch={true}
                onChange={(e) => setRole(e.target.value)}
                checked={role === "FREELANCER"}
              />
            </div>
          </div>
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
