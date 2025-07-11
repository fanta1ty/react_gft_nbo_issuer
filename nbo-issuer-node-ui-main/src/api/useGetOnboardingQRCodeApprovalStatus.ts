import { useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import apiService, { CustomAxiosError } from "./apiService";

export type ResponseType = {
  did: string;
  verifiedFields: {
    fieldName: string;
    fieldValue: string;
  }[];
};

export type ValuesType = {
  sessionId: string;
};

const useGetOnboardingQRCodeApprovalStatus = (
  options: UseQueryOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  const queryClient = useQueryClient();
  return async ({ sessionId }: { sessionId: string }) => {
    return await queryClient.fetchQuery({
      queryKey: ["onboarding-approval"],
      queryFn: async () => {
        try {
          const result = await apiService().get(
            `/v1/onboard/verification/status?sessionID=${sessionId}`,
          );
          return result.data;
        } catch (error) {
          if (
            (error as CustomAxiosError)?.response?.data?.message?.includes(
              "verifying",
            )
          ) {
            return "verifying";
          } else {
            return null;
          }
        }
      },
      ...options,
    });
  };
};

export default useGetOnboardingQRCodeApprovalStatus;
