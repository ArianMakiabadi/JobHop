import http from "./httpService";

export function getEmployerProjectsApi() {
  return http.get("/project/employer-projects").then(({ data }) => data.data);
}
