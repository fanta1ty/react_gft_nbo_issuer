import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

type ValuesType = {
  userId: string;
};

type ResponseType = { id: string };

type ErrorType = AxiosError<{ message: string }>;

const usePostRepresentativeResetPassword = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  return useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: async (body: ValuesType) => {
      const { data } = await apiService().post(
        "/v1/representatives/reset-password",
        {
          userId: body.userId,
        },
      );

      return data;
    },
    ...options,
  });
};

export default usePostRepresentativeResetPassword;
