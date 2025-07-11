import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import apiService, { type CustomAxiosError } from "@/api/apiService";

export type ResponseType = { message: string };

export type ErrorType = CustomAxiosError;

export type ValuesType = {
  revokeNonce: number;
};

const useRevokeCertificate = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  const mutation = useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: async (values: ValuesType) => {
      const { revokeNonce } = values;
      const { data } = await apiService().post(
        `/v1/credentials/revoke/${revokeNonce}`,
      );
      return data;
    },
    ...options,
  });
  return mutation;
};

export default useRevokeCertificate;
