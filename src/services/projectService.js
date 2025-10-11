import http from "./httpService";

export function getEmployerProjectsApi() {
  return http.get("/project/employer-projects").then(({ data }) => data.data);
}

export function removeProjectApi(id) {
  return http.delete(`/project/${id}`).then(({ data }) => data.data);
}
