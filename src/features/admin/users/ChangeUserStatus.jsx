import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import RHFSelect from "../../../UI/RHFSelect";
import Loading from "../../../UI/Loading";
import useChangeUserStatus from "./useChangeUserStatus";
import toast from "react-hot-toast";

const options = [
  {
    label: "rejected",
    value: 0,
  },
  {
    label: "pending",
    value: 1,
  },
  {
    label: "accepted",
    value: 2,
  },
];

function ChangeUserStatus({ status, userId, onClose, role }) {
  const { isUpdating, changeUserStatus } = useChangeUserStatus();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      status: status,
    },
  });
  const queryClient = useQueryClient();
  const onSubmit = (data) => {
    if (data.status === status) {
      onClose();
      return;
    }
    if (role === "ADMIN") {
      toast.error("Cannot modify admin accounts!");
      return;
    }
    changeUserStatus(
      { userId, ...data },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFSelect
          name="status"
          label="change status"
          register={register}
          options={options}
          watch={watch}
          requierd
        />
        <div className="mt-4">
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ChangeUserStatus;
