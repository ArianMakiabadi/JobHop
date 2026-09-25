import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import Loading from "../../UI/Loading";
import useCreateProposal from "./useCreateProposal";
import type { CreateProposalPayload } from "../../types";

type ProposalFormValues = Omit<CreateProposalPayload, "projectId">;

interface CreateProposalsProps {
  onClose: () => void;
  projectId: string;
}

function CreateProposals({ onClose, projectId }: CreateProposalsProps) {
  const { isCreating, createProposal } = useCreateProposal();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ProposalFormValues>();

  const onSubmit = (data: ProposalFormValues) => {
    const newProposal: CreateProposalPayload = {
      ...data,
      projectId,
    };
    createProposal(newProposal, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextField
          register={register}
          name="description"
          label="Description"
          errors={errors}
          required
          validationSchema={{
            required: "Enter the description.",
            minLength: {
              value: 15,
              message: "Title must be 15 characters or more.",
            },
          }}
        />
        <TextField
          register={register}
          name="price"
          label="Your Bid (€)"
          errors={errors}
          required
          validationSchema={{
            required: "Enter your bid.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed.",
            },
          }}
        />
        <TextField
          register={register}
          name="duration"
          label="Duration (days)"
          errors={errors}
          required
          validationSchema={{
            required: "Enter the expected duration.",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed.",
            },
          }}
        />
        <div>
          {isCreating ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full" type="submit">
              Bid
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateProposals;
