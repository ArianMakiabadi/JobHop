import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectStatus } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useToggleProjectStatus() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: toggleProject } = useMutation({
    mutationFn: toggleProjectStatus,
    onSuccess: () => {
      //invalidating the previous projects to update the value
      queryClient.invalidateQueries({
        queryKey: ["employer-projects"],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { isUpdating, toggleProject };
}
