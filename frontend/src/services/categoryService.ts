import http from "./httpService";
import type {
  ApiResponse,
  Category,
  CategoryPayload,
  MessageResponse,
  UpdateCategoryPayload,
} from "../types";

export function getCategoryApi(): Promise<{ categories: Category[] }> {
  return http
    .get<ApiResponse<{ categories: Category[] }>>("/category/list")
    .then(({ data }) => data.data);
}

export function createCategoryApi(
  data: CategoryPayload
): Promise<MessageResponse> {
  return http
    .post<ApiResponse<MessageResponse>>("/admin/category/add", data)
    .then(({ data }) => data.data);
}
export const updateCategoryApi = ({
  id,
  data,
}: UpdateCategoryPayload): Promise<MessageResponse> => {
  return http
    .patch<ApiResponse<MessageResponse>>(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
};
export const removeCategoryApi = (id: string): Promise<MessageResponse> => {
  return http
    .delete<ApiResponse<MessageResponse>>(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
};
