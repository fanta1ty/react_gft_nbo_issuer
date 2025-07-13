import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

type CredentialSubjectType = {
  endDate: string;
  score: number;
  startDate: string;
  type: string;
  image: string;
  courseName: string;
  expirationDate: string;
};

type CredentialType = {
  createdAt: string;
  credentialSubject: CredentialSubjectType;
  expired: boolean;
  expiresAt: string;
  id: string;
  proofTypes: string[];
  revNonce: number;
  revoked: boolean;
  schemaHash: string;
  schemaType: string;
  schemaUrl: string;
  userID: string;
  status: string;
};

export type UserType = {
  avatar: string;
  city: string;
  country: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
  nationalId: string;
  password: string;
  phone: string;
};

export type UserCredentialType = {
  credential: CredentialType;
  user: UserType;
};

export type CertificateType = {
  bigInt: string;
  createdAt: string;
  description: string;
  hash: string;
  id: string;
  title: string;
  type: string;
  url: string;
  userCredentials: UserCredentialType[];
  version: string;
};

export type ResponseType = CertificateType[] | undefined;

const useGetCertificates = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["certificates"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/certificates");

      return data;
    },
    ...hookOptions,
  });
};

export default useGetCertificates;
