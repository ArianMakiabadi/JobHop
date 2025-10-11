import { useQuery } from "@tanstack/react-query";
import { getEmployerProjectsApi } from "../../services/projectService";

export default function useEmployerProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["employer-projects"],
    queryFn: getEmployerProjectsApi,
  });

  const { projects } = data || {};
  return { projects, isLoading };
}
