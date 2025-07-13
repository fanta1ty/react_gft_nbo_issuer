import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = { id: string };

type ValuesType = {
  templateName: string;
  description: string;
};

const useRegisterTemplate = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async (body) => {
      const url = `/v1/register-schemas/create-schema-template`;
      return await apiService().post(url, body);
    },
    ...options,
  });
};

export default useRegisterTemplate;
