import { useForm } from "react-hook-form";
import RHFSelect from "../../UI/RHFSelect";
import useChangeProposalStatus from "./useChangeProposalStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../UI/Loading";

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

function ChangeProposalStatus({ proposalId, onClose, status }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      status: status,
    },
  });
  const { id: projectId } = useParams();
  const { isUpdating, changeProposalStatus } = useChangeProposalStatus();
  const queryClient = useQueryClient();
  const onSubmit = (data) => {
    changeProposalStatus(
      { id: proposalId, data },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["project", projectId] });
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

export default ChangeProposalStatus;
