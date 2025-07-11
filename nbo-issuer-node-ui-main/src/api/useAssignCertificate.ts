import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";
import { format } from "date-fns";
import { API_DATE_PARAM_FORMAT } from "@/constants";

type ResponseType = { id: string };

type ValuesType = {
  certificateId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  score: number;
};

const useAssignCertificate = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async (values) => {
      const { certificateId, startDate, endDate, score, userId } = values;
      const body = {
        userId: userId,
        score: score,
        startDate: format(startDate, API_DATE_PARAM_FORMAT),
        endDate: format(endDate, API_DATE_PARAM_FORMAT),
      };

      const url = `/v1/certificates/${certificateId}/assign`;
      return await apiService().post(url, body);
    },
    ...options,
  });
};

export default useAssignCertificate;
