import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = undefined;

type ValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  superAdmin: boolean;
};

const useInviteNewRepresentative = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async (values) => {
      const url = "/v1/onboards/representative/invite";
      return await apiService().post(url, values);
    },
    ...options,
  });
};

export default useInviteNewRepresentative;
