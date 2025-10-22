import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import RHFSelect from "../../../UI/RHFSelect";
import Loading from "../../../UI/Loading";
import useChangeUserStatus from "./useChangeUserStatus";

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

function ChangeUserStatus({ status, userId, onClose }) {
  const { isUpdating, changeUserStatus } = useChangeUserStatus();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      status: status,
    },
  });
  const queryClient = useQueryClient();
  const onSubmit = (data) => {
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
