import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

type ValuesType = {
  userId: string;
};

type ResponseType = { id: string };

type ErrorType = AxiosError<{ message: string }>;

const useDeleteRepresentative = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  return useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: async (body: ValuesType) => {
      const { data } = await apiService().delete(
        `/v1/representatives/${body.userId}`,
      );

      return data;
    },
    ...options,
  });
};

export default useDeleteRepresentative;
