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
    legalName,
    //legalNameArabic,
    //registrationNumber,
    //registrationAuthority,
    vatNumber,
    website,
    //corporateDomainName,
    //salesTaxGroup,
    //currency,
    //methodOfPayment,
    //ownership,
    //poBox,
    postalCode,
    street,
    //district,
    city,
    country,
    //telephoneNumber,
    //email: companyEmail,
    //bankName,
    //branch,
    //bankAddress,
    //accountName,
    //accountNumber,
    //ibanNumber,
    description,
  } = value.companyInformation;

  const {
    profilePicture,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    nationality,
    nationalId,
    email: personalEmail,
    password,
  } = value.personalDetails;

  const representative = {
    firstName,
    lastName,
    email: personalEmail,
    phone: phoneNumber,
    nationality,
    nationalId,
    dateOfBirth: formatDateForIssuerOnboarding(dateOfBirth),
    password,
    city,
    ...(profilePicture ? { avatar: await toBase64(profilePicture) } : {}),
  };

  const representatives = [representative];
  const formData = new FormData();
  formData.append("companyName", legalName);
  formData.append("email", personalEmail);
  formData.append("phone", phoneNumber);
  formData.append("country", country ? country : "");
  formData.append("city", city ? city : "");
  formData.append("companyWebsite", website ? website : "");
  formData.append("companyAddress", street ? street : "");
  formData.append("postalCode", postalCode ? postalCode : "");
  formData.append("taxIdentificationNumber", vatNumber ? vatNumber : "");
  formData.append("companyDescription", description ? description : "");
  formData.append("companyLogo", companyLogo ? companyLogo : "");
  formData.append("representatives", JSON.stringify(representatives));
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
