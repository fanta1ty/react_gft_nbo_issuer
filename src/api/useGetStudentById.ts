import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { StudentType } from "./useGetStudents";

export type ResponseType = StudentType;

type ArgsType = {
  id: string;
};

const useGetStudentById = (
  args: ArgsType,
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  const { id } = args ?? {};
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await apiService().get(`/v1/users/${id}`);

      return data;
    },
    enabled: typeof id === "string" && Boolean(id.length),
    ...hookOptions,
  });
};

export default useGetStudentById;
