import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = { id: string };

type ValuesType = {
  schemaId: string;
  schemaFields: Array<{
    key: string;
    type: string;
    title: string;
    required: boolean;
    description: string;
    titleAr: string;
    descriptionAr: string;
    format?: string;
    pattern?: string;
    minimum?: number;
  }>;
};

const useUpdateSchemaTemplate = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async (body) => {
      const url = `/v1/register-schemas/update-schema-template`;
      return await apiService().post(url, body);
    },
    ...options,
  });
};

export default useUpdateSchemaTemplate;
