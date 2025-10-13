import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProjectApi } from "../../services/projectService";
import toast from "react-hot-toast";

export default function useEditProject() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editProject } = useMutation({
    mutationFn: editProjectApi,
    onSuccess: () => {
      toast.success("Project updated!");

      //invalidating the previous projects to update the value
      queryClient.invalidateQueries({
        queryKey: ["employer-projects"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return { isEditing, editProject };
}
