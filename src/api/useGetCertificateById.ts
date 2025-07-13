import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { CertificateType } from "./useGetCertificates";

export type ResponseType = CertificateType;

type ArgsType = { id: string };

const useGetCertificateById = (
  args: ArgsType,
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  const { id } = args ?? {};
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["certificate", id],
    queryFn: async () => {
      const { data } = await apiService().get(`/v1/certificates/${id}`);

      return data;
    },
    enabled: typeof id === "string" && Boolean(id.length),
    ...hookOptions,
  });
};

export default useGetCertificateById;
