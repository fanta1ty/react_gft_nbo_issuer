import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { StudentType } from "./useGetStudents";

export type ResponseType = StudentType;

const useGetQRCode = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["qr-code"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/onboard/qrcode");

      return data;
    },
    ...hookOptions,
  });
};

export default useGetQRCode;
