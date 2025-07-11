import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import apiService, { type CustomAxiosError } from "@/api/apiService";

type ResponseType = { id: string };

type ValuesType = {
  certificateId: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  credentialSubject: Record<string, number | string | boolean>;
};

const useAssignCertificateNew = (
  options: UseMutationOptions<ResponseType, CustomAxiosError, ValuesType> = {},
) => {
  return useMutation<ResponseType, CustomAxiosError, ValuesType>({
    mutationFn: async ({ certificateId, ...values }) => {
      const body = {
        nationalID: values.nationalId,
        firstName: values.firstName,
        lastName: values.lastName,
        credentialSubject: transformCredentialSubject(values.credentialSubject),
      };

      const url = `/v1/certificates/${certificateId}/assign`;
      return await apiService().post(url, body);
    },
    ...options,
  });
};

/**
 * Ignore empty values
 */
const transformCredentialSubject = (
  subject: ValuesType["credentialSubject"],
) => {
  const result: ValuesType["credentialSubject"] = {};
  for (const key in subject) {
    if (subject[key] === "" || subject[key] === undefined) {
      continue;
    }
    result[key] = subject[key];
  }
  return result;
};

export default useAssignCertificateNew;
