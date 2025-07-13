import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import apiService, { CustomAxiosError } from "@/api/apiService";

type ArgsType = {
  nationalId: string;
};

export type HasAccountType = {
  did: string;
  firstName: string;
  lastName: string;
  message: "has_account";
  certificates?: Array<{ id: "string" }>;
};
export type NoAccountType = {
  message: "has_no_account";
};

export type AccountByNationalIdType = HasAccountType | NoAccountType;

const useGetUserByNationalId = (
  args: ArgsType,
  hookOptions?: UseQueryOptions<AccountByNationalIdType, CustomAxiosError>,
) => {
  const { nationalId } = args ?? {};
  return useQuery<AccountByNationalIdType, CustomAxiosError>({
    queryKey: ["users", "nationalId", nationalId],
    queryFn: async () => {
      const { data } = await apiService().get(
        `/v1/users/by-nationalID/${nationalId}`,
      );

      return data;
    },

    retry(failureCount, error) {
      if (error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    ...hookOptions,
  });
};

export default useGetUserByNationalId;
