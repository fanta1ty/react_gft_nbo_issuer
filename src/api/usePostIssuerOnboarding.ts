import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiService from "./apiService";
import type { CustomAxiosError } from "./apiService";
import { type InferType } from "yup";
import schema from "@/pages/OnboardingIssuer/schema";
import { toBase64 } from "@/utils/fileUtils";
import { formatDateForIssuerOnboarding } from "@/utils/datetime";

export type ResponseType = AxiosResponse<{ id: string }>;

export type ValuesType = {
  companyName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  companyAddress: string;
  postalCode: string;
  taxIdentificationNumber: string;
  companyDescription: string;
  companyWebsite: string;
  companyLogo: File;
  representatives: string;
  documents: File;
};

const transformData = async (value: InferType<typeof schema>) => {
  const {
    companyLogo,
    companyName,
    phone,
    companyWebsite,
    country,
    city,
    companyAddress,
    companyDescriptionAbout,
    email,
    postalCode,
    taxIdentificationNumber,
  } = value.companyInformation;
  const {
    avatar,
    firstName,
    lastName,
    email: personalEmail,
    phone: personalPhone,
    nationality,
    nationalId,
    dateOfBirth,
    password,
    did,
    sessionId,
  } = value.personalDetails;

  const representative = {
    firstName,
    lastName,
    email: personalEmail,
    phone: personalPhone,
    nationality,
    nationalId,
    dateOfBirth: formatDateForIssuerOnboarding(dateOfBirth),
    password,
    city,
    did,
    sessionId,
    ...(avatar ? { avatar: await toBase64(avatar) } : {}),
  };

  const representatives = [representative];
  const formData = new FormData();
  formData.append("companyName", companyName);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("country", country);
  formData.append("city", city);
  formData.append("companyWebsite", companyWebsite);
  formData.append("companyAddress", companyAddress);
  formData.append("postalCode", postalCode);
  formData.append("taxIdentificationNumber", taxIdentificationNumber);
  formData.append("companyDescription", companyDescriptionAbout);
  formData.append("companyLogo", companyLogo);
  formData.append("representatives", JSON.stringify(representatives));
  const { ministerOfEducation, other } = value.documents;
  if (ministerOfEducation) {
    formData.append("documents", ministerOfEducation);
  }
  if (other) {
    formData.append("documents", other);
  }
  return formData;
};

export const useIssuerOnboarding = (
  options: UseMutationOptions<
    ResponseType,
    CustomAxiosError,
    InferType<typeof schema>
  > = {},
) => {
  return useMutation({
    mutationFn: async (values: InferType<typeof schema>) => {
      return await apiService().post(
        "/v1/onboards",
        await transformData(values),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    ...options,
  });
};
