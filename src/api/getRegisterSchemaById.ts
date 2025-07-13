import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { SchemaType } from "@/@types";

export type ResponseType = SchemaType;

const useGetRegisterSchemaById = ({ id }: { id: string }) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["register-schema-by-id", id],
    queryFn: async () => {
      const { data } = await apiService().get(
        `/v1/register-schemas/get-by-id/${id}`,
      );
      return data;
    },
  });
};

export default useGetRegisterSchemaById;
