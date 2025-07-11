import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

export type ResponseType = {
  callback: string;
};

const useGetOnboardingQRCode = (
  sessionId?: string,
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["onboarding-qrcode", sessionId],
    queryFn: async () => {
      const sessionIdQueryParam = sessionId ? `?sessionID=${sessionId}` : "";

      const { data } = await apiService().get(
        `/v1/onboard/qrcode${sessionIdQueryParam}`,
      );
      return data;
    },
    enabled: true,
    ...hookOptions,
  });
};

export default useGetOnboardingQRCode;
