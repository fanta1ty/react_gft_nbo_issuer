import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { CertificateSchemaType } from "@/types";

type ArgsType = {
  id: string;
};

const useGetCertificateSchemasById = (
  args: ArgsType,
  hookOptions?: UseQueryOptions<CertificateSchemaType, AxiosError>,
) => {
  const { id } = args ?? {};
  return useQuery<CertificateSchemaType, AxiosError>({
    queryKey: ["schemas", id],
    queryFn: async () => {
      const { data } = await apiService().get(`/v1/schemas/${id}`);

      return data;
    },
    ...hookOptions,
  });
};

export default useGetCertificateSchemasById;
