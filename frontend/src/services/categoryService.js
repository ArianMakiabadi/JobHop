import http from "./httpService";

export function getCategoryApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function createCategoryApi(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}
export const updateCategoryApi = ({ id, data }) => {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
};
export const removeCategoryApi = (id) => {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
};
