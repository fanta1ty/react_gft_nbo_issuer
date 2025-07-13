import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

export type ResponseType = AxiosResponse<{ id: string }>;

export type RepresentativeType = {
  password: string;
  sessionId: string;
  did: string;
};

export type ValuesType = {
  representative: RepresentativeType;
};

export const usePostIssuerRepresentativeOnboarding = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation({
    mutationFn: async (values) => {
      return await apiService().post("/v1/onboards/representative", values);
    },
    ...options,
  });
};
