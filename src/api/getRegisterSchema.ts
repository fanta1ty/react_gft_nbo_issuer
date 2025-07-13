import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { SchemaType } from "@/@types";

export type ResponseType = SchemaType[] | undefined;

const useGetRegisterSchema = () => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["register-schema"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/register-schemas/get-all");
      return data;
    },
  });
};

export default useGetRegisterSchema;
