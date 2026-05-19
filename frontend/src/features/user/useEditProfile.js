import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileApi } from "../../services/authService";
import toast from "react-hot-toast";

export default function useEditProfile() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: editUserInfo } = useMutation({
    mutationFn: editProfileApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return { isPending, editUserInfo };
}
