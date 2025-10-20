import { useQuery } from "@tanstack/react-query";
import { getAllProjectsApi } from "../services/projectService";

export default function useProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjectsApi,
  });

  const { projects } = data || {};
  return { projects, isLoading };
}
