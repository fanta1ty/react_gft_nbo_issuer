import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { CertificateSchemaType } from "@/types";

const useGetCertificateSchemas = (
  hookOptions?: UseQueryOptions<CertificateSchemaType[], AxiosError>,
) => {
  return useQuery<CertificateSchemaType[], AxiosError>({
    queryKey: ["schemas"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/schemas");

      return data;
    },
    ...hookOptions,
  });
};

export default useGetCertificateSchemas;
