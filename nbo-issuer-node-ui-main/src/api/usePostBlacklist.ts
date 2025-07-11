import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

type ValuesType = {
  userId: string;
};

type ResponseType = { id: string };

type ErrorType = AxiosError<{ message: string }>;

const usePostBlacklist = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  return useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: async (body: ValuesType) => {
      const { data } = await apiService().post(
        `/v1/representatives/${body.userId}/blacklist`,
      );

      return data;
    },
    ...options,
  });
};

export default usePostBlacklist;
