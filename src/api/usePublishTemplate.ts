import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = { id: string };

type ValuesType = {
  schemaId: string;
};

const usePublishTemplate = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async (body) => {
      const url = `/v1/register-schemas`;
      return await apiService().post(url, body);
    },
    ...options,
  });
};

export default usePublishTemplate;
