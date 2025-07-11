import apiService from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResponseType = void; // This api return nothing
export type ErrorType = AxiosError<{ message: string }>;
export type ValuesType = {
  file: File;
};

const usePostCertificatesCSV = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  const mutation = useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: (values: ValuesType) => {
      return apiService().post(`/v1/certificates/migration`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    },
    ...options,
  });
  return mutation;
};

export default usePostCertificatesCSV;
