import { useQuery } from "@tanstack/react-query";
import { getEmployerProjectsApi } from "../../services/projectService";
import useUser from "../authentication/useUser";

export default function useEmployerProjects() {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["employer-projects"],
    queryFn: getEmployerProjectsApi,
    enabled: user?.role === "EMPLOYER",
  });

  const { projects } = data || {};
  return { projects, isLoading };
}
