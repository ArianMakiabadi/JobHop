import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeProposalStatusApi } from "../../services/proposalService";

export default function useChangeProposalStatus() {
  const { isPending: isUpdating, mutate: changeProposalStatus } = useMutation({
    mutationFn: changeProposalStatusApi,
    onSuccess: () => {
      toast.success("Status updated!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { isUpdating, changeProposalStatus };
}
