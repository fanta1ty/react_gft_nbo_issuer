import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

export type SchemaType = {
  jsonSchemaCid: string;
  schemaType: string;
};
export type ResponseType = SchemaType[];

const useGetSchemas = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["register-schemas"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/register-schemas");

      return data;
    },
    ...hookOptions,
  });
};

export default useGetSchemas;
