import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import useUser from "../authentication/useUser";
import useEditProfile from "./useEditProfile";
import Loading from "../../UI/Loading";

function EditProfile() {
  const { user } = useUser();
  const { isPending, editUserInfo } = useEditProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = (data) => {
    editUserInfo(data);
    console.log("submit", data);
  };

  return (
    <div className="flex md:justify-start">
      <div className="w-96">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="font-semibold text-secondary-600" htmlFor="name">
              First & Lastname
            </label>
            <TextField
              register={register}
              name="name"
              errors={errors}
              validationSchema={{ required: "Name is required" }}
            />
          </div>

          <div>
            <label className="font-semibold text-secondary-600" htmlFor="email">
              Email
            </label>
            <TextField
              register={register}
              name="email"
              errors={errors}
              validationSchema={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
