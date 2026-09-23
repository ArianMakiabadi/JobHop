import http from "./httpService";
import type {
  ApiResponse,
  ChangeProposalStatusPayload,
  CreateProposalPayload,
  MessageResponse,
  Proposal,
} from "../types";

export function changeProposalStatusApi({
  proposalId,
  ...rest
}: ChangeProposalStatusPayload): Promise<MessageResponse> {
  return http
    .patch<ApiResponse<MessageResponse>>(`/proposal/${proposalId}`, rest)
    .then(({ data }) => data.data);
}

export function getProposalApi(): Promise<{ proposals: Proposal[] }> {
  return http
    .get<ApiResponse<{ proposals: Proposal[] }>>(`/proposal/list`)
    .then(({ data }) => data.data);
}

export function createProposalApi(
  data: CreateProposalPayload
): Promise<MessageResponse> {
  return http
    .post<ApiResponse<MessageResponse>>(`/proposal/add`, data)
    .then(({ data }) => data.data);
}
