import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";

type ResponseType = { cid: string; status: string };

type ValuesType = {
  schemaId: string;
};

const useDeactivateTemplate = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async ({ schemaId }) => {
      const url = `/v1/register-schemas/deactivate/${schemaId}`;
      return await apiService().post(url);
    },
    ...options,
  });
};

export default useDeactivateTemplate;
