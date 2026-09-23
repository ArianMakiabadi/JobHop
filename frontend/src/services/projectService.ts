import http from "./httpService";
import type {
  ApiResponse,
  CreateProjectPayload,
  EditProjectPayload,
  MessageResponse,
  Project,
  ProjectDetail,
  RawProject,
  ToggleProjectStatusPayload,
} from "../types";

export function getEmployerProjectsApi(): Promise<{ projects: Project[] }> {
  return http
    .get<ApiResponse<{ projects: Project[] }>>("/project/employer-projects")
    .then(({ data }) => data.data);
}

export function getProjectsApi(
  queryString: string
): Promise<{ projects: Project[] }> {
  return http
    .get<ApiResponse<{ projects: Project[] }>>(`/project/list/${queryString}`)
    .then(({ data }) => data.data);
}

export function removeProjectApi(id: string): Promise<MessageResponse> {
  return http
    .delete<ApiResponse<MessageResponse>>(`/project/${id}`)
    .then(({ data }) => data.data);
}

export function createProjectApi(
  data: CreateProjectPayload
): Promise<MessageResponse & { project: RawProject }> {
  return http
    .post<ApiResponse<MessageResponse & { project: RawProject }>>(
      `/project/add`,
      data
    )
    .then(({ data }) => data.data);
}

export function editProjectApi({
  id,
  newProject,
}: EditProjectPayload): Promise<MessageResponse> {
  return http
    .patch<ApiResponse<MessageResponse>>(`/project/update/${id}`, newProject)
    .then(({ data }) => data.data);
}

export function toggleProjectStatus({
  id,
  data,
}: ToggleProjectStatusPayload): Promise<MessageResponse> {
  return http
    .patch<ApiResponse<MessageResponse>>(`/project/${id}`, data)
    .then(({ data }) => data.data);
}

export function getProjectApi(id: string): Promise<{ project: ProjectDetail }> {
  return http
    .get<ApiResponse<{ project: ProjectDetail }>>(`/project/${id}`)
    .then(({ data }) => data.data);
}
