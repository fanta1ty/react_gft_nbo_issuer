import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = void;

type ValuesType = {
  schemaId: string;
};

const useDeleteSchema = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async ({ schemaId }) => {
      const url = `/v1/register-schemas/${schemaId}`;
      return await apiService().delete(url);
    },
    ...options,
  });
};

export default useDeleteSchema;
